/* eslint-disable jsx-a11y/img-redundant-alt */
import './PhotoGrid.css';

function Photo({photoId}) {
    return (
        <div className="photo">
            <img src={`//images.weserv.nl/?url=https://bccead4858e2.ngrok.io/tempbikephotos/${photoId}.jpg&w=300`} alt="Featured QR-bike photo" />
        </div>
    )
}
export default function PhotoGrid({photos, columns}) {
    return (
        <div className="photoGrid" style={columns ? {gridTemplateColumns: `${'1fr '.repeat(columns)}`}: null}>
            {photos.map(photo => (
                <Photo photoId={photo} />
            ))}
        </div>
    );
}