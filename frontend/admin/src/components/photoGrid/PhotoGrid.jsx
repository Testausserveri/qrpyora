import api from '../../api/api';
import './PhotoGrid.css';
import LazyLoad from 'react-lazyload';
import {MdDelete} from "react-icons/all";
import FlexCenter from "../common/center/FlexCenter";
import QRModal from "../common/modal/QRModal";
import {useState} from "react";



function Photo({photoId, onDelete, edit}) {

    return (
        <>
            <div className={"photo" + (!photoId ? " emptyPhoto" : "")}>
                {photoId ?
                    <>
                        {edit ? <div className={"photo-icons"}>
                            <FlexCenter>
                                <div className={'photo-action'} onClick={() => {onDelete(photoId)}}>
                                    <MdDelete/>
                                </div>
                            </FlexCenter>
                        </div> : undefined}

                        <LazyLoad>
                            <img src={`//images.weserv.nl/?url=${api.getPhotoUrl(photoId)}&w=300`} alt="QR-bike" />
                        </LazyLoad>
                    </>
                    :
                    null
                }
            </div>
        </>
    )
}
export default function PhotoGrid({photos, columns, refreshCallback, edit}) {
    console.log(JSON.stringify(photos))
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteProgress, setDeleteProgress] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const deletePhoto = async () => {
        setDeleteProgress(true);
        await api.deletePicture(deleteId);
        setDeleteProgress(false);
        setDeleteConfirmation(false);
        if (refreshCallback)
            refreshCallback();
    };
    return (
        <>
            <QRModal isOpen={deleteConfirmation} title={"Poista kuva"} close={"Peruuta"} action={"Poista"} actionCallback={deletePhoto} onModalClose={()=>{setDeleteConfirmation(false)}}>
                {deleteProgress===true ? <>
                    <FlexCenter>
                        <div className={"spinner"}/>
                    </FlexCenter>
                </> : <>
                    <p>Olet poistamassa kuvaa! <b>Tätä toimintoa ei voi peruuttaa suorittamisen jälkeen!</b><br/>Oletko varma?</p>
                </>}
            </QRModal>
            <div className="photoGrid" style={columns ? {gridTemplateColumns: `${'1fr '.repeat(columns)}`}: null}>
                {photos.map(photo => (

                    <Photo edit={edit} key={edit ? photo.fileName : photo} photoId={edit ? photo.fileName : photo} onDelete={() => {setDeleteConfirmation(true);setDeleteId(photo.id)}} />
                ))}
            </div>
        </>

    );
}