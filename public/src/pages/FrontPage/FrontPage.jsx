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
const bikeIcon = new L.Icon({
    iconUrl: pin,
    iconRetinaUrl: pin,
    popupAnchor:  [-0, -0],
    iconSize: [64, 64],     
});

const featuredPhotos = [
    '503', '514', '573', '577',
    '604', '565', '586', '564',
    '652', '691', '697', '724'
];

export default function FrontPage({bikes}) {
    const history = useHistory();
    return <>
        <Center wider>
            <MapContainer center={[61.0379992, 25.6290388]} zoom={6} scrollWheelZoom={false} className="bikeMap">
                <TileLayer
                    attribution='&copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
                    url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
                />

                {bikes.map(marker => (
                    <Marker key={marker.bikeId} position={[marker.lat, marker.lon]} icon={bikeIcon} eventHandlers={{
                        click: () => { history.push(`/bikes/${marker.bikeId}`) },
                      }}>
                    </Marker>
                ))}
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
            <PhotoGrid photos={featuredPhotos} />
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
                Verkkopalvelun tuottaa <a href="https://testausserveri.fi">Testausserveri</a>.
            </p>
            <p>
                Haluatko pystyttää oman QR-pyöräsi? Liity Testausserverille ja kysy lisää!
            </p>
        </Center>
    </>
}