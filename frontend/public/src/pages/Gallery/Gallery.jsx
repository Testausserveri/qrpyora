import React, { useCallback, useEffect, useState } from "react";
import Center from "../../components/common/center/Center";
import './Gallery.css'
import PhotoGrid from '../../components/photoGrid/PhotoGrid';
import { Link } from 'react-router-dom';
import api from "../../api/api";


function BikeCard({data}) {
    // Fill missing photo slots, if there is >4

    let bike = {...data};
    if (bike.photos.length !== 4) bike.photos = [...bike.photos, ...Array(4 - bike.photos.length).fill(null)];

    return (
        <Link to={`/bikes/${bike.id}`} style={{display: 'flex'}}>
            <div className="bikeCard" style={{'--photo-count': bike.photosCount - 4}}>
                <PhotoGrid 
                    photos={bike.photos.map(p => ({image: p}))} columns={2} disableLightbox />
                    <h3>{bike.name}</h3>
                    <span>{bike.location?.name || "Sijaintia ei asetettu"}</span>
            </div>
        </Link>
    )
}
export default function GalleryPage({bikes}) {
    const [allPhotos, setAllPhotos] = useState([]);

    const loadAllPhotos = useCallback(async () => {
        const pictures = await api.getAllPhotos();
        setAllPhotos(pictures);
    }, []);

    useEffect(() => loadAllPhotos(), [loadAllPhotos]);

    return <>
        <Center>
            <h2>Kaikki QR-pyörät</h2>
        </Center>
        <Center wider>
            <div className="bikeGridView">
                {bikes.map(bike => <BikeCard key={bike.id} data={bike} />)}
            </div>
        </Center>
        <Center>
            <h2>Kaikki kuvat</h2>
        </Center>
        <Center wider>
            <div className="bikePhotos">
                <PhotoGrid photos={allPhotos.map(p => ({image: p.filename, bike: p.bike}))}/>
            </div>
        </Center>
    </>
}