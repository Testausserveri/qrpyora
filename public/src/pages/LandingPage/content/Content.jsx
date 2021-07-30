import React from "react";
import './Content.css'

export default class LandingPageContent extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return <>
            <content-container>
                <h1>test123</h1>
            </content-container>
        </>
    }
}