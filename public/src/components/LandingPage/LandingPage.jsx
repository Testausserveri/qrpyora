import React from 'react';
import './LadingPage.css'
import Header from "./header/Header";
import LandingPageContent from "./content/Content";

export default class LandingPage extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return <>
            <landing-container>
                <Header/>
                <LandingPageContent/>
            </landing-container>
        </>
    }
}