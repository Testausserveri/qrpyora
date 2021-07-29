import React from "react";
import './Content.css'
import QRPyoraCard from "./components/card/Card";

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
                <h1>hello world!</h1>
                <QRPyoraCard>
                    <h1>sddsdsd</h1>
                </QRPyoraCard>
            </content-container>
        </>
    }
}