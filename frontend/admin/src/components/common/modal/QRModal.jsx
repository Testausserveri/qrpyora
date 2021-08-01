import React, {useEffect} from "react";
import Modal from 'react-modal';
import './Modal.css'


export default function QRModal(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        setIsOpen(props.isOpen);
    }, [props.isOpen])

    return (
        <div style={{zIndex: 5}}>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="ModalOverlay"
                className="ModalContent">
                <h2>{props.title}</h2>
                <hr/>
                {props.children}
                {props.action ? <modal-button onClick={props.actionCallback}>{props.action}</modal-button> : undefined}
                {props.close ? <modal-button onClick={closeModal}>{props.close}</modal-button>  : undefined}
            </Modal>
            </div>
    );
}