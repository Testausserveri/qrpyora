import React from "react";
import './Content.css'
import BikeSelector from "./selector/BikeSelector";

export default class BikesContent extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return <>
            <content-container>
                <BikeSelector/>
            </content-container>
        </>
    }
}