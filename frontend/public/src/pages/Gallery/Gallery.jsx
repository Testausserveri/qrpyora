import React from "react";
import Center from "../../components/common/center/Center";
import './Gallery.css'
import PhotoGrid from '../../components/photoGrid/PhotoGrid';
import { Link } from 'react-router-dom';


function BikeCard({data}) {
    // Fill missing photo slots, if there is >4

    let bike = {...data};
    if (bike.photos.length !== 4) bike.photos = [...bike.photos, ...Array(4 - bike.photos.length).fill(null)];

    return (
        <Link to={`/bikes/${bike.id}`}>
            <div className="bikeCard" style={{'--photo-count': bike.photosCount - 4}}>
                <PhotoGrid 
                    photos={bike.photos} columns={2} disableLightbox />
                    <h3>{bike.name}</h3>
                    <span>{bike.location?.name || "Sijaintia ei asetettu"}</span>
            </div>
        </Link>
    )
}
export default function GalleryPage({bikes}) {
    return <>
        <Center>
            <h2>Kaikki QR-pyörät</h2>
        </Center>
        <Center wider>
            <div className="bikeGridView">
                {bikes.map(bike => <BikeCard key={bike.id} data={bike} />)}
            </div>
        </Center>
    </>
}