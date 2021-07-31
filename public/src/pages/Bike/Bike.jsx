import React, { useCallback, useEffect, useState } from "react";
import Center from "../../components/common/center/Center";
import { useParams } from 'react-router-dom';
import './Bike.css';
import formatcoords from 'formatcoords';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import pin from '../../assets/pin.png';
import PhotoGrid from '../../components/photoGrid/PhotoGrid';
import api from "../../api/api";

const bikeIcon = new L.Icon({
    iconUrl: pin,
    iconRetinaUrl: pin,
    popupAnchor:  [-0, -0],
    iconSize: [52, 52],     
});

export default function BikePage({bikes}) {
    const { bikeId } = useParams();
    const [ bikeData, setBikeData ] = useState({});

    // Load all bike data from server
    const loadBikeData = useCallback(async (bikeId) => {
        let bike = await api.getBike(bikeId);
        if (bike.id) {
            setBikeData(bike)
        };
    }, [setBikeData]);

    // Find bike data in local bike list
    useEffect(() => {
        if (bikeData.id) return;
        let bike = bikes.find(b => b.id.toString() === bikeId);

        if (bike?.id) {
            setBikeData(bike);
        }
    }, [bikes, bikeData, bikeId])

    useEffect(() => loadBikeData(bikeId), [bikeId, loadBikeData]);
    if (!bikeData.id) return null;

    console.log(bikeData)
    const latestLocation = bikeData.location.id ? bikeData.location : bikeData.location[0];

    let mapUrl = `https://www.google.com/maps/search/?api=1&query=${latestLocation.lat},${latestLocation.lon}`;
    let mapText = 'Avaa Google Mapsissa';

    // Check for Apple device
    if (/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)) {
        mapUrl = `https://maps.apple.com/?q=${latestLocation.lat},${latestLocation.lon}`;
        mapText = 'Avaa Apple Mapsissa';
    }

    return <>
        <Center>
            <div className="bikeHeader">
                <div className="bikeDetails">
                    <h2>{bikeData.name}</h2>
                    <span>{latestLocation.name}</span>
                    <span>{formatcoords(latestLocation.lat, latestLocation.lon).format()}</span>
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
            <MapContainer center={[latestLocation.lat, latestLocation.lon]} zoom={12} scrollWheelZoom={true} className="bikeMap">
                <TileLayer
                    url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
                />
                <Marker position={[latestLocation.lat, latestLocation.lon]} icon={bikeIcon}></Marker>
            </MapContainer>
        </Center>
        { bikeData.photos.length > 0 ? 
            <>
                <Center>
                    <h2>Kaikki kuvat</h2>
                </Center>
                <Center wider>
                    <div className="bikePhotos">
                        <PhotoGrid photos={bikeData.photos.map(p => p.fileName)}/>
                    </div>
                </Center>
            </>
            :
            <Center>
                <p>
                    Tähän QR-pyörään ei ole lisätty vielä yhtäkään kuvaa. Käy etsimässä polkupyörä ollaksesi ensimmäinen!
                </p>
            </Center>
        }
        
    </>
}