import React from "react";
import Center from "../../components/common/center/Center";
import './FrontPage.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import pin from '../../assets/pin.png';
import { useHistory } from "react-router";
import horseImage from '../../assets/horse.png';
import PhotoGrid from "../../components/photoGrid/PhotoGrid";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

import featured1 from '../../assets/featured/1.jpg';
import featured2 from '../../assets/featured/2.jpg';
import featured3 from '../../assets/featured/3.jpg';
import featured4 from '../../assets/featured/4.jpg';
import featured5 from '../../assets/featured/5.jpg';
import featured6 from '../../assets/featured/6.jpg';
import featured7 from '../../assets/featured/7.jpg';
import featured8 from '../../assets/featured/8.jpg';
import featured9 from '../../assets/featured/9.jpg';
import featured10 from '../../assets/featured/10.jpg';
import featured11 from '../../assets/featured/11.jpg';
import featured12 from '../../assets/featured/12.jpg';

const bikeIcon = new L.Icon({
    iconUrl: pin,
    iconRetinaUrl: pin,
    popupAnchor:  [-0, -0],
    iconSize: [64, 64],     
});

const featuredPhotos = [
    featured1, featured2, featured3, featured4, 
    featured5, featured6, featured7, featured8, 
    featured9, featured10, featured11, featured12
];

export default function FrontPage({bikes}) {
    const history = useHistory();
    return <>
        <Center wider>
            <MapContainer center={[61.0379992, 25.6290388]} zoom={6} scrollWheelZoom={false} className="bikeMap">
                <TileLayer
                   
                    url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
                />

                {bikes.map(marker => {
                    if (!marker.location) return null;
                    return <Marker key={marker.id} position={[marker.location.lat, marker.location.lon]} icon={bikeIcon} eventHandlers={{
                        click: () => { history.push(`/bikes/${marker.id}`) },
                      }}>
                    </Marker>;
                })}
            </MapContainer>
        </Center>
        <Center>
            <h2>QR-pyörä</h2>
            <div className="imageParagraph">
                <div>
                    <p>
                        QR-pyörä on valtakunnallinen katutaideteos, jonka kyljissä ovat suuret kyltit QR-koodeilla varustettuina. Polkupyöriä sijaisee tällä hetkellä muun muassa Lappeenrannassa ja Helsingissä.
                    </p>
                    <p>
                        Skannaamalla QR-koodin, päätyy tehtäväsivulle. Tehtäväsivulla näkee muiden ihmisten ottamia kuvia QR-pyörän kanssa, sekä pystyy ottamaan itse oman kuvan sinne. Tehtävä saattaa vaihtua, joten pysy kuulolla! 😉
                    </p>
                </div>
                <div className="imageContainer">
                    <img src={horseImage} alt="Horse riding a QR-bike" />
                </div>
            </div>  
        </Center>
        <Center wider>
            <PhotoGrid photos={featuredPhotos} fullUrl />
        </Center>
        <Center>
            <Link to="/gallery">
                <button>
                    <span>Siirry katsomaan lisää kuvia</span>
                    <span className="buttonIcon">
                        <MdKeyboardArrowRight /> 
                    </span>
                </button>
            </Link>
            <p>
                Haluatko pystyttää oman QR-pyöräsi tai kiinnostaako sinua kuulla projektista lisää? Liity <a href="https://testausserveri.fi">Testausserverille</a>!
            </p>
        </Center>
    </>
}