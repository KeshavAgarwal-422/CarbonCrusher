import { useEffect, useRef, useState } from 'react';

const useEventListener = (eventName, handler, element = window) => {
    const savedHandler = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event) => savedHandler.current(event);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
};





const SensorComponent = () => {
    const [accelerometerData, setAccelerometerData] = useState({
        x: null,
        y: null,
        z: null,
    });

    const [gyroscopeData, setGyroscopeData] = useState({
        alpha: null,
        beta: null,
        gamma: null,
    });

    const [soundFrequencyData, setSoundFrequencyData] = useState([]);

    useEffect(() => {
        const handleDeviceMotion = (event) => {
            const { acceleration } = event;
            setAccelerometerData({
                x: acceleration.x,
                y: acceleration.y,
                z: acceleration.z,
            });
        };

        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', handleDeviceMotion, true);
        } else {
            console.log("DeviceMotionEvent is not supported on this device.");
        }

        const handleDeviceOrientation = (event) => {
            const { alpha, beta, gamma } = event;
            setGyroscopeData({
                alpha,
                beta,
                gamma,
            });
        };

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleDeviceOrientation, true);
        } else {
            console.log("DeviceOrientationEvent is not supported on this device.");
        }

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const handleUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);
                analyser.connect(audioContext.destination);

                const updateSoundData = () => {
                    analyser.getByteFrequencyData(dataArray);
                    setSoundFrequencyData([...dataArray]);
                    requestAnimationFrame(updateSoundData);
                };

                updateSoundData();
            } catch (error) {
                console.error('Error accessing user media:', error);
            }
        };

        handleUserMedia();

        return () => {
            window.removeEventListener('devicemotion', handleDeviceMotion, true);
            window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
        };
    }, [accelerometerData, gyroscopeData]);



    return (
        <div>
            <h2>Accelerometer Data:</h2>
            <p>X: {accelerometerData.x}</p>
            <p>Y: {accelerometerData.y}</p>
            <p>Z: {accelerometerData.z}</p>

            <h2>Gyroscope Data:</h2>
            <p>Alpha: {gyroscopeData.alpha}</p>
            <p>Beta: {gyroscopeData.beta}</p>
            <p>Gamma: {gyroscopeData.gamma}</p>

            <h2>Sound Data:</h2>
            <p>Frequency Data: {soundFrequencyData.join(', ')}</p>
        </div>
    );
};

export default SensorComponent;

