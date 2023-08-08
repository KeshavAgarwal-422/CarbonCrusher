import React, { useEffect, useState } from 'react';

const SensorComponent = () => {
    const windowSize = 50;  // Number of readings to keep for smoothing

    const [accelerometerData, setAccelerometerData] = useState({
        x: [],
        y: [],
        z: [],
    });

    useEffect(() => {
        const handleDeviceMotion = (event) => {
            const { acceleration } = event;

            setAccelerometerData((prevData) => {
                const newData = {
                    x: [...prevData.x.slice(-windowSize + 1), acceleration?.x || 0],
                    y: [...prevData.y.slice(-windowSize + 1), acceleration?.y || 0],
                    z: [...prevData.z.slice(-windowSize + 1), acceleration?.z || 0],
                };
                return newData;
            });

        };

        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', handleDeviceMotion, true);
        } else {
            console.log("DeviceMotionEvent is not supported on this device.");
        }

        return () => {
            window.removeEventListener('devicemotion', handleDeviceMotion, true);

        };
    }, []);

    const calculateStatistics = (data) => {
        const sum = data.reduce((acc, val) => acc + val, 0);
        const mean = sum / data.length;
        const min = Math.min(...data);
        const max = Math.max(...data);
        const variance = data.reduce((variance, value) => variance + ((value - mean) ** 2), 0) / data.length;
        const std = Math.sqrt(variance);

        return {
            mean: mean.toFixed(2),
            min: min.toFixed(2),
            max: max.toFixed(2),
            std: std.toFixed(2),
        };
    };

    const accelerometerStats = calculateStatistics([
        ...accelerometerData.x,
        ...accelerometerData.y,
        ...accelerometerData.z,
    ]);


    const classifyTransportMode = (accelerometerStats) => {
        if (accelerometerStats.max < 2) {
            return 'Still';
        }
        else if (accelerometerStats.max >= 2 && accelerometerStats.max < 5) {
            return 'Walking';
        }
        else if (accelerometerStats.max >= 5 && accelerometerStats.max < 10) {
            return 'Running';
        }
        else if (accelerometerStats.max >= 10 && accelerometerStats.max < 15) {
            return 'Biking';
        }
        else if (accelerometerStats.max >= 15) {
            return 'In Vehicle';
        }
        else {
            return 'Unknown';
        }
    };
    const transportMode = classifyTransportMode(accelerometerStats);

    return (
        <div>
            <h2>Accelerometer Data:</h2>
            <p>Mean: {accelerometerStats.mean}</p>
            <p>Min: {accelerometerStats.min}</p>
            <p>Max: {accelerometerStats.max}</p>
            <p>Std: {accelerometerStats.std}</p>
            <h2>Transport Mode:</h2>
            <p>{transportMode}</p>


        </div>
    );
};

export default SensorComponent;
