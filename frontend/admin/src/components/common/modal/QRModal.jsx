import React from "react";
import Modal from 'react-modal';
import './Modal.css'


export default class QRModal extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {modalIsOpen: props.isOpen}
    }


    closeModal() {
        this.props.onModalClose();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.modalIsOpen) {
            this.setState({ modalIsOpen: nextProps.isOpen });
        }
    }

    render() {
        return (
            <div style={{zIndex: 5}}>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => {this.closeModal()}}
                    overlayClassName="ModalOverlay"
                    className="ModalContent"
                    contentLabel={this.props.contentLabel}>
                    <h2>{this.props.title}</h2>
                    <hr/>
                    {this.props.children}
                    {this.props.action ? <modal-button onClick={this.props.actionCallback}>{this.props.action}</modal-button> : undefined}
                    {this.props.close ? <modal-button onClick={() => {this.closeModal()}}>{this.props.close}</modal-button>  : undefined}
                </Modal>
            </div>
        );
    }
}