import React, { useState, useEffect } from 'react';

const Test = () => {

    return (<> <GyroscopeReading></GyroscopeReading></>)
}




const GyroscopeReading = () => {

    const [rotation, setRotation] = useState({ alpha: 0, beta: 0, gamma: 0 });

    useEffect(() => {
        const handleOrientation = (event) => {
            setRotation({
                alpha: event.alpha,
                beta: event.beta,
                gamma: event.gamma,
            });
        };

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleOrientation);
        } else {
            alert("Sorry, your browser doesn't support DeviceOrientation");
        }

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    return (
        <div>
            <h2>Gyroscope Data</h2>
            <p>Alpha: {rotation.alpha}</p>
            <p>Beta: {rotation.beta}</p>
            <p>Gamma: {rotation.gamma}</p>
        </div>
    );
}





export default Test;