import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService } from '@react-google-maps/api';
import axios from 'axios';

const TransportationClassifier = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [transportationMode, setTransportationMode] = useState(null);

    // Function to handle the response from the Directions API
    const onDirectionsLoad = (results) => {
        if (results && results.length > 0) {
            // Extract travel modes from the response
            const travelModes = results.map((result) => result.request.travelMode);

            // Analyze the travel modes to determine the most probable transportation mode
            const modeCounts = {};
            travelModes.forEach((mode) => {
                modeCounts[mode] = (modeCounts[mode] || 0) + 1;
            });

            const mostProbableMode = Object.keys(modeCounts).reduce((a, b) => (modeCounts[a] > modeCounts[b] ? a : b));
            setTransportationMode(mostProbableMode);
        }
    };

    // Function to handle user's location retrieval
    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    };

    // Make the API call to the Directions API with different travel modes
    const getTransportationMode = () => {
        if (userLocation) {
            const travelModes = ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'];
            const promises = travelModes.map((mode) => {
                return axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
                    params: {
                        origin: `${userLocation.lat},${userLocation.lng}`,
                        destination: `${userLocation.lat},${userLocation.lng}`,
                        travelMode: mode,
                        key: 'YOUR_GOOGLE_MAPS_API_KEY',
                    },
                });
            });

            Promise.all(promises)
                .then((responses) => {
                    const results = responses.map((response) => response.data.routes[0].legs[0]);
                    onDirectionsLoad(results);
                })
                .catch((error) => {
                    console.error('Error fetching directions:', error);
                });
        }
    };

    // Call getUserLocation when the component mounts
    useEffect(() => {
        getUserLocation();
    }, []);

    // Call getTransportationMode when userLocation changes
    useEffect(() => {
        getTransportationMode();
    }, [userLocation]);

    return (
        <div>
            <p>User's location: {userLocation ? `${userLocation.lat}, ${userLocation.lng}` : 'Fetching...'}</p>
            <p>Transportation mode: {transportationMode ? transportationMode : 'Detecting...'}</p>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                    mapContainerStyle={{ width: '400px', height: '400px' }}
                    center={userLocation}
                    zoom={15}
                >
                    {userLocation && <DirectionsService options={{ origin: userLocation, destination: userLocation, travelMode: 'DRIVING' }} onLoad={onDirectionsLoad} />}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default TransportationClassifier;
