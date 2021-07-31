/* eslint-disable jsx-a11y/img-redundant-alt */
import api from '../../api/api';
import './PhotoGrid.css';
import LazyLoad from 'react-lazyload';
import { MdPlayArrow } from 'react-icons/md';

function Photo({media, fullUrl}) {
    let photo = media;
    let video;

    if (typeof media === 'object') {
        photo = media.image
        video = media.video;
    };
    const contents = <>
        {media ?
            <LazyLoad>
                <img src={(fullUrl ? photo : `//images.weserv.nl/?url=${api.getPhotoUrl(photo)}&w=300`)} alt="QR-bike photo" />
            </LazyLoad>
        :
            null
        }
        {video ?
            <div className="videoCover">
                <MdPlayArrow />
            </div>
        : null}
    </>;

    if (!video) {
        return <div className={"photo" + (!media ? " emptyPhoto" : "")}>{contents}</div>
    } else {
        return <a target="_blank" rel="noreferrer" href={video} className={"photo" + (!media ? " emptyPhoto" : "")}>{contents}</a>
    }
}
export default function PhotoGrid({photos, columns, fullUrl}) {
    console.log(JSON.stringify(photos))
    return (
        <div className="photoGrid" style={columns ? {gridTemplateColumns: `${'1fr '.repeat(columns)}`}: null}>
            {photos.map(photo => (
                <Photo key={photo} media={photo} fullUrl={fullUrl} />
            ))}
        </div>
    );
}