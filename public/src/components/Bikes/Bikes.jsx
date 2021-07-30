import React from 'react';
import './Bikes.css'
import Header from "./header/Header";
import BikesContent from "./content/Content";

export default class Bikes extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return <>
            <bikes-container>
                <Header/>
                <BikesContent/>
            </bikes-container>
        </>
    }
}