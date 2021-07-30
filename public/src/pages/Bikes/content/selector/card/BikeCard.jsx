/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import './BikeCard.css'
import QRPyoraCard from "../../../../../components/card/Card";

export class BikeCard extends React.Component {
    render() {
        const {bike} = this.props;
        return <>
            <QRPyoraCard>
                <div className="imgGallery">
                    <img src="https://picsum.photos/190/190?1" />
                    <img src="https://picsum.photos/190/190?2" />
                    <img src="https://picsum.photos/190/190?3" />
                    <img src="https://picsum.photos/190/190?4" />
                </div>
                <h2>{bike.name}</h2>
                <h4>{bike.location}</h4>
            </QRPyoraCard>
        </>
    }
}