import React, { useEffect, useState, useRef } from 'react';

const SensorComponent_1 = () => {
    const [reading, setReading] = useState({ x: 0, y: 0, z: 0 });
    const [serverResponse, setServerResponse] = useState("");
    const [hasRequestedPermission, setHasRequestedPermission] = useState(false);
    const [isAccessGranted, setAccessGranted] = useState(false);
    const websocket = useRef(null);  // Using a ref to persist websocket instance across re-renders

    const requestMotionAccess = async () => {
        if (hasRequestedPermission) return;

        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            const permission = await DeviceMotionEvent.requestPermission();
            setHasRequestedPermission(true);  // Mark that we've already made a request
            if (permission === 'granted') {
                setAccessGranted(true);
            } else {
                console.warn("Permission was denied.");
            }
        } else {
            setAccessGranted(true);
        }
    }

    useEffect(() => {
        requestMotionAccess();

        const handleDeviceMotion = (event) => {
            if (isAccessGranted && event.acceleration && event.acceleration.x !== null && event.acceleration.y !== null && event.acceleration.z !== null) {
                setReading({
                    x: event.acceleration.x.toFixed(2),
                    y: event.acceleration.y.toFixed(2),
                    z: event.acceleration.z.toFixed(2),
                });
            }
        };

        if (isAccessGranted) {
            // Start listening to the device motion
            window.addEventListener('devicemotion', handleDeviceMotion);

            // Setup the WebSocket connection
            websocket.current = new WebSocket("ws://localhost:3001");

            websocket.current.onopen = () => {
                // Send data every 5 seconds
                setInterval(() => {
                    websocket.current.send(JSON.stringify(reading));
                }, 5000);
            };

            websocket.current.onmessage = (event) => {
                // Update the state with the received data
                setServerResponse(event.data);
            };

            websocket.current.onerror = (error) => {
                console.error(`WebSocket Error: ${error}`);
            };
        }

        // Clean up listeners and WebSocket connection
        return () => {
            window.removeEventListener('devicemotion', handleDeviceMotion);
            if (websocket.current) {
                websocket.current.close();
            }
        };
    }, [reading, isAccessGranted]);  // Include isAccessGranted in the dependency array

    return (
        <div>
            <h1>Accelerometer Readings:</h1>
            <p>X: {reading.x}</p>
            <p>Y: {reading.y}</p>
            <p>Z: {reading.z}</p>
            <h2>Server Response:</h2>
            <p>{serverResponse}</p>
        </div>
    );
};

export default SensorComponent_1;
