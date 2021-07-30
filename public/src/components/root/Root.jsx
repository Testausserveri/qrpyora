import React from 'react';
import './Root.css'
import Header from "../../components/common/header/Header";

export default class Root extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return <>
            <root-container>
                <Header/>
                {this.props.children}
            </root-container>
        </>
    }
}