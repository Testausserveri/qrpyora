/* eslint-disable jsx-a11y/img-redundant-alt */
import api from '../../api/api';
import './PhotoGrid.css';

function Photo({photoId}) {
    return (
        <div className="photo">
            <img src={`//images.weserv.nl/?url=${api.getPhotoUrl(photoId)}&w=300`} alt="Featured QR-bike photo" />
        </div>
    )
}
export default function PhotoGrid({photos, columns}) {
    console.log(JSON.stringify(photos))
    return (
        <div className="photoGrid" style={columns ? {gridTemplateColumns: `${'1fr '.repeat(columns)}`}: null}>
            {photos.map(photo => (
                <Photo key={photo} photoId={photo} />
            ))}
        </div>
    );
}