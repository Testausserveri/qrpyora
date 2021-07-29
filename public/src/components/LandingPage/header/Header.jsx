import React from 'react';
import './Header.css'
export default class Header extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return <>
            <qrpyora-header>
                <h1>QR Pyörä</h1>
            </qrpyora-header>
            <hr/>
        </>
    }

}