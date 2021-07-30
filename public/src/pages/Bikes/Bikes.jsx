import React from 'react';
import BikesContent from "./content/Content";
import Root from "../../components/root/Root";

export default class Bikes extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return <>
            <Root>
                <BikesContent/>
            </Root>
        </>
    }
}