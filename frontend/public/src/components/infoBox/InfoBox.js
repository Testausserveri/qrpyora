import './InfoBox.css';

export default function InfoBox(props) {
    return (
        <div className="infoBox">
            <p>{props.children}</p>
        </div>
    )
}
