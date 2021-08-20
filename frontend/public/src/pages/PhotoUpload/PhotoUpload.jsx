import { useState } from "react";
import { MdHome } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Center from "../../components/common/center/Center";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import PhotoGrid from "../../components/photoGrid/PhotoGrid";
import { useBikeData } from "../Bike/Bike";
import "./PhotoUpload.css";

/*
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
*/

export default function PhotoUpload({bikes}) {
    const { bikeId, secret } = useParams();
    //const secret = useQuery().get("s");
    const [bikeData] = useBikeData(bikes, bikeId);

    const [newPhotos, setNewPhotos] = useState([]);
    function addPhoto(url) {
        setNewPhotos([url, ...newPhotos]);
    }

    return <div className="photoUploadPage">
        <Center>
            <h2>Ota selfie pyörän kanssa ja lisää kuva</h2>
            <ImageUploader bikeId={bikeId} secret={secret} onAdded={(url) => addPhoto(url)} />
            <p className="smallPrint">
            Ladatut kuvat julkaistaan lisenssillä <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.fi">CC0 1.0</a>.
            </p>
        </Center>
        {bikeData.photos ? 
        <Center wider>
            <div className="bikePhotos">
                <PhotoGrid photos={[...newPhotos, ...bikeData.photos.map(p => p.fileName)].map(p => ({image: p}))}/>
            </div>
        </Center>
        : null }
        <Center>
            <hr />
            <footer style={{display: 'block'}}>
                <Link to="/">
                    <button>
                        <span>QR-pyörän kotisivut</span>
                        <span className="buttonIcon">
                            <MdHome /> 
                        </span>
                    </button>
                </Link>
            </footer>
            
        </Center>

    </div>;
}