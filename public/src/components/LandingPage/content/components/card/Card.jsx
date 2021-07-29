import React from "react";
import './Card.css'

export default class QRPyoraCard extends React.Component {
    render() {
        const {child} = this.props;
        return <cardFrame>
            {child}
        </cardFrame>
    }
}