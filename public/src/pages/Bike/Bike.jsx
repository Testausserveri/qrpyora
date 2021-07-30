import Header from '../../components/common/header/Header';
import React from "react";
import Center from "../../components/common/center/Center";
import { useParams } from 'react-router-dom';
import './Bike.css';
import formatcoords from 'formatcoords';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import pin from '../../assets/pin.png';
import PhotoGrid from '../../components/photoGrid/PhotoGrid';
const bikeIcon = new L.Icon({
    iconUrl: pin,
    iconRetinaUrl: pin,
    popupAnchor:  [-0, -0],
    iconSize: [52, 52],     
});

export default function BikePage({bikes}) {
    const { bikeId } = useParams();
    const bike = bikes.find(b => b.bikeId.toString() === bikeId);

    let mapUrl = `https://www.google.com/maps/search/?api=1&query=${bike.lat},${bike.lon}`;
    let mapText = 'Avaa Google Mapsissa';

    // Check for Apple device
    if (/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)) {
        mapUrl = `https://maps.apple.com/?ll=${bike.lat},${bike.lon}`;
        mapText = 'Avaa Apple Mapsissa';
    }

    return <>
        <Header />
        <Center>
            <div className="bikeHeader">
                <div className="bikeDetails">
                    <h2>{bike.city}</h2>
                    <span>{bike.locationName}</span>
                    <span>{formatcoords(bike.lat, bike.lon).format()}</span>
                </div>
                <div>
                    <a href={mapUrl} target="_blank" rel="noreferrer">
                        <button>
                            <span>{mapText}</span>
                        </button>
                    </a>
                </div>
            </div>
        </Center>
        <Center wider>
            <MapContainer center={[bike.lat, bike.lon]} zoom={12} scrollWheelZoom={true} className="bikeMap">
                <TileLayer
                    attribution='&copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
                    url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
                />

                {bikes.map(marker => (
                    <Marker position={[bike.lat, bike.lon]} icon={bikeIcon}></Marker>
                ))}
            </MapContainer>
        </Center>
        <Center>
            <h2>Kaikki kuvat</h2>
        </Center>
        <Center wider>
            <PhotoGrid photos={bike.previewPhotos}/>
        </Center>
    </>
}