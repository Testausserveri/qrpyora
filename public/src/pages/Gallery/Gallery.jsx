import React from "react";
import Center from "../../components/common/center/Center";
import './Gallery.css'
import PhotoGrid from '../../components/photoGrid/PhotoGrid';
import { Link } from 'react-router-dom';


function BikeCard({data}) {
    return (
        <Link to={`/bikes/${data.id}`}>
            <div className="bikeCard" style={{'--photo-count': data.photosCount - 4}}>
                <PhotoGrid 
                    photos={data.photos} columns={2} />
                {data.location ?
                    <>
                        <h3>{data.name}</h3>
                        <span>{data.location.name}</span>
                    </>
                : null}
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