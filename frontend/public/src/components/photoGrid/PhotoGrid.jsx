/* eslint-disable jsx-a11y/img-redundant-alt */
import api from '../../api/api';
import './PhotoGrid.css';
import LazyLoad from 'react-lazyload';
import { MdPlayArrow } from 'react-icons/md';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useState } from 'react';

function Photo({media, fullUrl, openInLightbox}) {
    let photo = media;
    let video;

    if (media?.video) {
        photo = media.image
        video = media.video;
    };
    const contents = <>
        {media ?
            <LazyLoad>
                {/*change to this once in prod: <img src={`//images.weserv.nl/?url=${(fullUrl ? photo : api.getPhotoUrl(photo))}&w=300`} alt="QR-bike photo" />*/}
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
        return <div className={"photo" + (!media ? " emptyPhoto" : "") + (!openInLightbox ? " disabledLightbox" : "")} onClick={openInLightbox ? () => openInLightbox() : () => {}}>{contents}</div>
    } else {
        return <a target="_blank" rel="noreferrer" href={video} className={"photo" + (!media ? " emptyPhoto" : "")}>{contents}</a>
    }
}
export default function PhotoGrid({photos, columns, fullUrl, disableLightbox}) {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const photoUrls = photos.map((media) => {
        if (!media) return null;

        let url;
        if (media?.video) {
            url = media.image
        } else {
            url = (media.startsWith('/static/media/') ? media : api.getPhotoUrl(media))
        }

        return url;
    });

    const viewLightbox = (index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    }

    console.log(JSON.stringify(photos))
    return (
        <>
            <div className="photoGrid" style={columns ? {gridTemplateColumns: `${'1fr '.repeat(columns)}`}: null}>
                {photos.map((photo, index) => (
                    <Photo key={photo} media={photo} fullUrl={fullUrl} openInLightbox={(!disableLightbox ? () => viewLightbox(index) : null)} />
                ))}
            </div>
            {isOpen && (
            <Lightbox
                mainSrc={photoUrls[photoIndex]}
                nextSrc={photoUrls[(photoIndex + 1) % photoUrls.length]}
                prevSrc={photoUrls[(photoIndex + photoUrls.length - 1) % photoUrls.length]}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() =>
                    setPhotoIndex((photoIndex + photoUrls.length - 1) % photoUrls.length)
                }
                onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % photoUrls.length)
                }
            />
            )}
        </>
    );
}