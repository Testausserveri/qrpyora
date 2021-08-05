import React, {useEffect, useState} from "react";
import Center from "../../components/common/center/Center";
import './Gallery.css'
import PhotoGrid from '../../components/photoGrid/PhotoGrid';
import { Link, useHistory} from 'react-router-dom';
import api from "../../api/api";
import {MdAdd} from "react-icons/all";
import FlexCenter from "../../components/common/center/FlexCenter";
import QRModal from "../../components/common/modal/QRModal";


function BikeCard({data}) {
    // Fill missing photo slots, if there is >4

    let bike = {...data};
    if (bike.photos.length !== 4) bike.photos = [...bike.photos, ...Array(4 - bike.photos.length).fill(null)];

    return (
        <Link to={`/bikes/${bike.id}`}>
            <div className="bikeCard" style={{'--photo-count': bike.photosCount - 4}}>
                <PhotoGrid 
                    photos={bike.photos} edit={false} columns={2} />
                <h3>{bike.name}</h3>
                <span>{bike.location?.name || "Sijaintia ei asetettu"}</span>
            </div>
        </Link>
    )
}
export default function GalleryPage({bikes, refreshCallback, location}) {
    const [ currentlyAdding, setCurrentlyAdding ] = useState(false);

    const [ bikeAdd, setBikeAdd ] = useState(false);
    const [ name, setName ] = useState("");
    const [ desc, setDesc ] = useState("");

    const addBike = async () => {
        setCurrentlyAdding(true);
        let result = await api.addBike({name: name, desc: desc});
        setCurrentlyAdding(result);
        setBikeAdd(!result);
        if (result)
            refreshCallback();
    };
    const history = useHistory();

    useEffect(() => {
        if (history?.location?.state?.update)
            refreshCallback();
    }, [history?.location?.state?.update])

    return <>
        <QRModal isOpen={bikeAdd} title={"Lisää uusi pyörä"} action={"Lisää"} actionCallback={addBike} onModalClose={()=>{setBikeAdd(false)}}>
            {currentlyAdding===true ? <>
                <FlexCenter>
                    <div className={"spinner"}/>
                </FlexCenter>
            </> : <>
                <input value={name} type={"text"} id={"name"} placeholder={"Nimi"} onInput={e => setName(e.target.value)}/>
                <input value={desc} type={"text"} id={"desc"} placeholder={"Kuvaus"} onInput={e => setDesc(e.target.value)}/>
            </>}
        </QRModal>

        <Center>
            <div className={"titleBar"}>
                <h2>Kaikki QR-pyörät</h2>
                <button className={"actionButton"} onClick={() => {setBikeAdd(true)}}>
                    <MdAdd/>
                </button>
            </div>

        </Center>
        <Center wider>
            <div className="bikeGridView">
                {bikes.map(bike => <BikeCard key={bike.id} data={bike}/>)}
            </div>
        </Center>
    </>
}