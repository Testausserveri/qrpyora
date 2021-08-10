import React, { useCallback, useEffect, useState } from "react";
import Center from "../../components/common/center/Center";
import { useParams } from 'react-router-dom';
import './Bike.css';
import formatcoords from 'formatcoords';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import pin from '../../assets/pin.png';
import PhotoGrid from '../../components/photoGrid/PhotoGrid';
import api from "../../api/api";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const bikeIcon = new L.Icon({
    iconUrl: pin,
    iconRetinaUrl: pin,
    popupAnchor:  [-0, -0],
    iconSize: [52, 52],
});

export function useBikeData(bikes, bikeId) {
    const [ apiFailed, setApiFailed ] = useState(false);
    const [ bikeData, setBikeData ] = useState({});
    const [ mapPos, setMapPos] = useState([0,0]);

    // Load all bike data from server
    const loadBikeData = useCallback(async (bikeId) => {
        let {bike, status} = await api.getBike(bikeId);
        console.log(bike);
        if (!status) {
            setApiFailed(true);
            return;
        }
        if (bike.id) {
            setBikeData(bike)
            setMapPos([bike.location?.lat !== undefined ? bike.location?.lat: 0, bike.location?.lon !== undefined ? bike.location?.lon: 0,]);
        }
    }, [setBikeData]);

    // Find bike data in local bike list
    useEffect(() => {
        if (bikeData.id) return;
        let bike = bikes.find(b => b.id.toString() === bikeId);

        if (bike?.id) {
            setBikeData(bike);
            setMapPos([bike.location?.lat !== undefined ? bike.location?.lat: 0, bike.location?.lon !== undefined ? bike.location?.lon: 0,]);
        }
    }, [bikes, bikeData, bikeId])

    useEffect(() => loadBikeData(bikeId), [bikeId, loadBikeData]);

    // No idea why someone has added mapPos here,
    // when it is available inside bikeData
    return [bikeData, mapPos, apiFailed];
}

export default function BikePage({bikes}) {
    const { bikeId } = useParams();
    const [bikeData, mapPos, apiFailed] = useBikeData(bikes, bikeId);    

    if (apiFailed) return <NotFoundPage />;
    if (!bikeData.id) return null;

    console.log(bikeData)
    const latestLocation = bikeData.location?.id ? bikeData.location : bikeData?.locations ? bikeData?.locations[0] : undefined;

    let mapUrl = `https://www.google.com/maps/search/?api=1&query=${latestLocation?.lat},${latestLocation?.lon}`;
    let mapText = 'Avaa Google Mapsissa';

    // Check for Apple device
    if (/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)) {
        mapUrl = `https://maps.apple.com/?q=${latestLocation?.lat},${latestLocation?.lon}`;
        mapText = 'Avaa Apple Mapsissa';
    }

    return <>
        <Center>
            <div className="bikeHeader">
                <div className="bikeDetails">
                    <h2>{bikeData.name}</h2>
                    <span>{latestLocation?.name || "Tuntematon sijainti"}</span>
                    <span>{latestLocation?.lat ? formatcoords(latestLocation?.lat, latestLocation?.lon).format() : ""}</span>
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
            <MapContainer center={mapPos} zoom={12} scrollWheelZoom={true} className="bikeMap">
                <TileLayer
                    url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
                />
                <Marker position={mapPos} icon={bikeIcon}/>
                {(bikeData && bikeData?.locations && bikeData?.locations?.length > 0) ?
                    <>
                        <Polyline positions={[bikeData.locations.map(i => {return [i.lat, i.lon]})]}/>
                    </> : ""}
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