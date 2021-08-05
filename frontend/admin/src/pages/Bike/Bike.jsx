import React, {useCallback, useEffect, useRef, useState} from "react";
import Center from "../../components/common/center/Center";
import { useParams } from 'react-router-dom';
import './Bike.css';
import formatcoords from 'formatcoords';

import {MapContainer, TileLayer, Marker, Polyline} from 'react-leaflet';
import L from 'leaflet';
import pin from '../../assets/pin.png';
import PhotoGrid from '../../components/photoGrid/PhotoGrid';
import api from "../../api/api";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import FlexCenter from "../../components/common/center/FlexCenter";
import { geolocated } from "react-geolocated";
import QRModal from "../../components/common/modal/QRModal";
import {MdAdd, MdDelete, MdList} from "react-icons/all";
import { useHistory } from "react-router-dom";

const bikeIcon = new L.Icon({
    iconUrl: pin,
    iconRetinaUrl: pin,
    popupAnchor:  [-0, -0],
    iconSize: [52, 52],     
});

export default geolocated()(function BikePage({bikes, isGeolocationAvailable, coords}) {
    const { bikeId } = useParams();
    const [ bikeData, setBikeData ] = useState({});
    const [ mapPos, setMapPos] = useState([0,0]);
    const [ apiFailed, setApiFailed ] = useState(false);
    const [ locationPrompt, setLocationPrompt ] = useState(false);
    const [ locationListPrompt, setLocationListPrompt ] = useState(false);
    const [ currentlyAdding, setCurrentlyAdding ] = useState(false);
    const [ locListLoading, setLocListLoading ] = useState(false);
    const markerRef = useRef(null)
    const [ currentlyDeleting, setCurrentlyDeleting ] = useState(false);
    const [ bikeDelete, setBikeDelete ] = useState(false);
    const history = useHistory();

    // Load all bike data from server
    const loadBikeData = useCallback(async (bikeId) => {
        let {bike, status} = await api.getBike(bikeId);
        if (!status) {
            setApiFailed(true);
            return;
        }
        if (bike.id) {
            setBikeData(bike)
            setMapPos([bike.location?.lat !== undefined ? bike.location?.lat: 0, bike.location?.lon !== undefined ? bike.location?.lon: 0,]);
        };
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

    if (apiFailed) return <NotFoundPage />;
    if (!bikeData.id) return null;

    const addLocation = async () => {
        setCurrentlyAdding(true);
        let result = await api.addLocation(bikeData.id, {lat: markerRef.current._latlng.lat, lon: markerRef.current._latlng.lng});
        setCurrentlyAdding(false);
        if (result) {
            setLocationPrompt(false);
            loadBikeData(bikeId);
        }
    };

    const deleteLocation = async (location) => {
        setLocListLoading(true);
        let result = await api.deleteLocation(location.id);
        setLocListLoading(result);
        if (result) {
            await loadBikeData(bikeId);
            setLocListLoading(false);
        }
    }

    const handleDelete = async () => {
        setBikeDelete(true);
    }
    const confirmedDelete = async () => {
        setCurrentlyDeleting(true);
        let result = await api.deleteBike(bikeData.id);
        setCurrentlyDeleting(result);
        setBikeDelete(!result);
        if (result) {
            history.push("/", {update: true});
        }
    }

    const latestLocation = bikeData.location?.id ? bikeData.location : bikeData?.locations ? bikeData?.locations[0] : undefined;

    const secretUrl = `https://qrpyora.fi/bikes/${bikeData.id}/${bikeData.secret}`

    let mapUrl = `https://www.google.com/maps/search/?api=1&query=${latestLocation?.lat},${latestLocation?.lon}`;
    let mapText = 'Avaa Google Mapsissa';

    // Check for Apple device
    if (/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)) {
        mapUrl = `https://maps.apple.com/?q=${latestLocation?.lat},${latestLocation?.lon}`;
        mapText = 'Avaa Apple Mapsissa';
    }

    return <>
        <Center>
            <QRModal isOpen={bikeDelete} title={"Poista pyörä"} action={"Poista"} close={"Peruuta"} actionCallback={confirmedDelete} onModalClose={()=>{setBikeDelete(false)}}>
                {currentlyDeleting===true ? <>
                    <FlexCenter>
                        <div className={"spinner"}/>
                    </FlexCenter>
                </> : <>
                    <p>Olet poistamassa pyörää {bikeData ? bikeData.name : "Tuntematon"} <b>PYSYVÄSTI</b>! Oletko varma?</p>
                </>}
            </QRModal>
            <QRModal contentLabel="LocationSelector" isOpen={locationPrompt} title={"Lisää sijainti"} action={"Lisää"} close={"Sulje"} actionCallback={addLocation} onModalClose={()=>{setLocationPrompt(false)}}>
                {currentlyAdding===true ? <>
                    <FlexCenter>
                        <div className={"spinner"}/>
                    </FlexCenter>
                </> : <>
                    {coords ? <>
                        <MapContainer center={[coords.latitude, coords.longitude]} zoom={12} scrollWheelZoom={true} className="bikeMap mapSelector">
                            <TileLayer
                                attribution='&copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
                                url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
                            />
                            <Marker position={[coords.latitude, coords.longitude]} draggable={true} ref={markerRef}/>
                        </MapContainer>
                    </> : <h3>Salli sijainnin käyttöoikeudet</h3>}

                </>}

            </QRModal>
            <QRModal contentLabel="LocationList" isOpen={locationListPrompt} title={"Sijainnit"} close={"Sulje"} onModalClose={()=>{setLocationListPrompt(false)}}>
                {locListLoading===true ? <>
                    <FlexCenter>
                        <div className={"spinner"}/>
                    </FlexCenter>
                </> : <FlexCenter><ul>
                    {bikeData && bikeData.locations ?
                        bikeData.locations.map(location => (
                            <>
                                <li className={"locationItem"}>
                                    <span>{location?.lat ? formatcoords(location?.lat, location?.lon).format() : ""}</span>
                                    <span>{location?.name || "Tuntematon sijainti"}</span>
                                    <button className={"iconButton"} onClick={()=>{deleteLocation(location)}}>
                                        <MdDelete/>
                                    </button>
                                </li>
                                <hr/>
                            </>

                        ))
                        : <h3>Ei sijainteja lisätty</h3>
                    }
                </ul></FlexCenter>}
            </QRModal>
            <div className="bikeHeader">
                <div className="bikeDetails">
                    <h2>{bikeData.name}</h2>
                    <span>{latestLocation?.name || "Tuntematon sijainti"}</span>
                    <span>{latestLocation?.lat ? formatcoords(latestLocation?.lat, latestLocation?.lon).format() : ""}</span>
                    <span>QR-koodin URL: <a href={secretUrl}>{secretUrl}</a></span>
                    <button className={"actionButton"} onClick={() => {handleDelete()}}>
                        <MdDelete/>
                    </button>
                </div>
                <FlexCenter>
                    <a href={mapUrl} target="_blank" rel="noreferrer" style={{marginBottom: '0.5rem'}}>
                        <button disabled={true}>
                            <span>{mapText}</span>
                        </button>
                    </a>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <button className={"iconButton"} disabled={!isGeolocationAvailable} onClick={() => {setLocationPrompt(true)}}>
                            <MdAdd/>
                        </button>
                        <button className={"iconButton"} disabled={!isGeolocationAvailable} onClick={() => {setLocationListPrompt(true)}}>
                            <MdList/>
                        </button>
                    </div>
                </FlexCenter>
            </div>
        </Center>
        <Center wider>
            <MapContainer center={mapPos} zoom={12} scrollWheelZoom={true} className="bikeMap">
                <TileLayer
                    attribution='&copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
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
                        <PhotoGrid edit={true} photos={bikeData.photos} refreshCallback={() => {loadBikeData(bikeId)}}/>
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
})