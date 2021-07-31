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
    '4924af86-45ec-42e9-a64e-d5eb3d5a2a7f.jpg', 'd9f73f01-995f-4352-b306-20777d8f5ef7.jpg', '360ce957-2ba6-4096-8558-126312164a4e.jpg', 'f464a6d9-d6c9-48e1-89df-a523dd9ce4a9.jpg',
    '914c1877-d8d7-458b-b8a4-f020b13b1c1c.jpg', '68b05d0a-6965-4e2e-8528-c8c94de6febd.jpg', '947ba23e-2668-44f6-909f-635f1d02d3fe.jpg', 'fa1a273d-e564-4e95-a731-4a2d098b05b3.jpg',
    'b29940b0-87e0-4106-bcb1-de31a625183d.jpg', '4bf933bc-5ff5-4726-9310-554253785aeb.jpg', '1dd5016d-8087-4fdb-a4fc-ce7db7a00297.jpg', '5aa4c8b7-7691-465f-8afa-cde6653391e7.jpg'
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
                Haluatko pystyttää oman QR-pyöräsi tai kiinnostaako sinua kuulla projektista lisää? Liity <a href="https://testausserveri.fi">Testausserverille</a>!
            </p>
        </Center>
    </>
}