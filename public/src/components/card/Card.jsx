import React from "react";
import './Card.css'

export default class QRPyoraCard extends React.Component {
    render() {
        return <div className="card-frame">
            {this.props.children}
        </div>
    }
}