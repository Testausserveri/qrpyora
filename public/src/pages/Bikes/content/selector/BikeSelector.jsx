import React from "react";
import './BikeSelector.css'
import {BikeCard} from "./card/BikeCard";


export default class BikeSelector extends React.Component {
    render() {
        return <>
            <div className="container">
                <div className="bikesGrid">
                    <BikeCard bike={{name: "test123", location: "Jokela"}}/>
                    <BikeCard bike={{name: "test2", location: "Lappeenranta"}}/>
                    <BikeCard bike={{name: "test4", location: "Helsinki"}}/>
                    <BikeCard bike={{name: "test4", location: "Helsinki"}}/>
                    <BikeCard bike={{name: "test4", location: "Helsinki"}}/>
                    <BikeCard bike={{name: "test4", location: "Helsinki"}}/>
                    <BikeCard bike={{name: "test4", location: "Helsinki"}}/>
                    <BikeCard bike={{name: "test4", location: "Helsinki"}}/>
                    <BikeCard bike={{name: "test4", location: "Helsinki"}}/>
                </div>
            </div>
        </>
    }
}