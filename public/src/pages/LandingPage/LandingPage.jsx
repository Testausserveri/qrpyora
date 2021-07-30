import React from 'react';
import LandingPageContent from "./content/Content";
import Root from "../../components/root/Root";

export default class LandingPage extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return <>
            <Root>
                <LandingPageContent/>
            </Root>
        </>
    }
}