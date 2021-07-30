import Header from '../../components/common/header/Header';
import React from "react";
import Center from "../../components/common/center/Center";
import './Gallery.css'
import PhotoGrid from '../../components/photoGrid/PhotoGrid';
import { Link } from 'react-router-dom';


function BikeCard({data}) {
    return (
        <Link to={`/bikes/${data.bikeId}`}>
            <div className="bikeCard" style={{'--photo-count': data.photoCount - 4}}>
                <PhotoGrid 
                    photos={data.previewPhotos} columns={2} />
                <h3>{data.city}</h3>
                <span>{data.locationName}</span>
            </div>
        </Link>
    )
}
export default function FrontPageContent({bikes}) {
    return <>
        <Header />
        <Center>
            <h2>Kaikki QR-pyörät</h2>
        </Center>
        <Center wider>
            <div className="bikeGridView">
                {bikes.map(bike => <BikeCard data={bike} />)}
            </div>
        </Center>
    </>
}