import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Showtimes.css';
import api from '../utils/api';

const Showtimes = () => {
    // Finkino Cinema locations with approximate latitude and longitude
    const cinemas = [
        { name: 'Cine Atlas Tampere', position: [61.4978, 23.7602], theatreId: 1034 },
        { name: 'Fantasia Jyväskylä', position: [62.2417, 25.7482], theatreId: 1015 },
        { name: 'Flamingo Vantaa', position: [60.2931, 25.0717], theatreId: 1013 },
        { name: 'Kinopalatsi Helsinki', position: [60.1699, 24.9384], theatreId: 1031 },
        { name: 'Itis Helsinki', position: [60.2360, 25.0237], theatreId: 1045 },
        { name: 'Kinopalatsi Turku', position: [60.4518, 22.2666], theatreId: 1022 },
        { name: 'Kuvapalatsi Lahti', position: [60.9754, 25.6600], theatreId: 1017 },
        { name: 'Maxim Helsinki', position: [60.1689, 24.9315], theatreId: 1032 },
        { name: 'Omena Espoo', position: [60.2000, 24.6558], theatreId: 1039 },
        { name: 'Plaza Oulu', position: [65.0120, 25.4683], theatreId: 1018 },
        { name: 'Plevna Tampere', position: [61.4971, 23.7607], theatreId: 1035 },
        { name: 'Promenadi Pori', position: [61.4877, 21.7961], theatreId: 1019 },
        { name: 'Sello Espoo', position: [60.2155, 24.8037], theatreId: 1038 },
        { name: 'Scala Kuopio', position: [62.8922, 27.6864], theatreId: 1016 },
        { name: 'Strand Lappeenranta', position: [61.0587, 28.1915], theatreId: 1041 },
        { name: 'Tennispalatsi Helsinki', position: [60.1580, 24.9260], theatreId: 1033 }
    ];

    // Create a custom icon for the markers
    const cinemaIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25613.png',  // Replace with your icon's URL
        iconSize: [32, 32],  // Icon size
        iconAnchor: [16, 32],  // Anchor point of the icon (center bottom)
        popupAnchor: [0, -32],  // Popup position relative to the icon
    });

    const [userLocation, setUserLocation] = useState(null);
    const [nearbyCinemas, setNearbyCinemas] = useState([]);
    const [showtimes, setShowtimes] = useState([]);

    const fetchLatestShowtimes = async () => {
        try {
            if (nearbyCinemas.length === 0) {
                console.log("No nearby cinemas found.");
                return;
            }
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const theatreID = nearbyCinemas[0].theatreId;

            const response = await api.get(`/showtimes/schedule?theatreID=${theatreID}&date=${formattedDate}`);
            const latestShowtimes = response.data.slice(0, 3);
            setShowtimes(latestShowtimes);
            
        } catch (error) {
            console.error("API Error: ", error);
        }
    }

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        // Get day, month, and year
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        // Get hours and minutes
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}.${minutes}`;
    }

    // Get the user's location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Geolocation error: ", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    // Find nearby theaters within a 50km radius
    useEffect(() => {
        if (userLocation) {
            const nearby = cinemas.filter(cinema => {
                const cinemaLatLng = L.latLng(cinema.position);
                const userLatLng = L.latLng(userLocation);
                const distance = userLatLng.distanceTo(cinemaLatLng); // Returns distance in meters
                return distance <= 50000; // 50 km radius
            });
            setNearbyCinemas(nearby);
        }
    }, [userLocation]);

    // Get the latest showtimes for the nearest theater
    useEffect(() => {
        if (nearbyCinemas.length > 0) {
            fetchLatestShowtimes();
        }
    }, [nearbyCinemas]);

    const SetMapBounds = ({ cinemas }) => {
        const map = useMap();

        React.useEffect(() => {
            if (cinemas.length > 0) {
                const bounds = cinemas
                    .map(cinema => cinema.position)
                    .filter(position => position && position.length === 2); // Make sure we have valid coordinates
                if (bounds.length > 0) {
                    map.fitBounds(bounds); // Adjust map view to fit all markers
                }
            }
        }, [cinemas, map]);

        return null;
    };


    return (
        <div>
            {/* Showtimes Section */}
            <div className="showtimes-container">
                <div className="showtimes-content">
                    <h1 className="showtimes-title">Discover Upcoming Movies</h1>
                    <p className="showtimes-subtitle">Explore showtimes for your favorite movies</p>
                </div>
                <div className="showtimes-image"></div>
            </div>

            {/* Map Section */}
            <div className="find-theaters-container">
                <div className="map-placeholder">
                    <div className="map-text">Find the nearest theaters</div>
                    <MapContainer
                        style={{ width: '100%', height: '400px' }}
                        zoom={6} // Starting zoom level, will adjust to fit markers
                        scrollWheelZoom={false} // Disable zoom on scroll
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <SetMapBounds cinemas={nearbyCinemas} />  {/* Center map to fit nearby markers */}
                        {nearbyCinemas.map((cinema, index) => (
                            <Marker key={index} position={cinema.position} icon={cinemaIcon}>
                                <Popup>{cinema.name}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>

            {/* Latest Showtimes Section */}
            <div className="latest-showtimes">
                <h1>Latest Showtimes</h1>
                <div className="latest-showtime-grid">
                    {showtimes.map((showtime, index) => {
                        return (
                            <div key={index} className="latest-showtime-card">
                                <h3>{showtime.title}</h3>
                                <p>Theatre: {showtime.theatre}</p>
                                <p>Showtime: {formatDate(showtime.showtime)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Nearby Cinemas List */}
            <div className="nearby-theaters">
                <h2>Nearby Theaters</h2>
                <ul>
                    {nearbyCinemas.length > 0 ? (
                        nearbyCinemas.map((cinema, index) => (
                            <li key={index}>
                                {cinema.name}
                            </li>
                        ))
                    ) : (
                        <li>No nearby theaters found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Showtimes;
