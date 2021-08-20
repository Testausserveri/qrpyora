/* eslint-disable jsx-a11y/img-redundant-alt */
import api from '../../api/api';
import './PhotoGrid.css';
import LazyLoad from 'react-lazyload';
import { MdPlayArrow } from 'react-icons/md';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Photo({media, openInLightbox}) {
    const fullUrl = media?.image?.startsWith('http') || media?.image?.startsWith('/static/media/') || null;
    let imageUrl = fullUrl ? media.image : api.getPhotoUrl(media?.image);
    if (process.env.NODE_ENV !== 'development' && !fullUrl) imageUrl = `//images.weserv.nl/?url=${imageUrl}&w=300`;

    const contents = <>
        {media?.image ?
            <LazyLoad>
                <img src={imageUrl} alt="QR-bike photo" />
            </LazyLoad>
        :
            null
        }
        {media?.video ?
            <div className="videoCover">
                <MdPlayArrow />
            </div>
        : null}
        {media?.bike ?
            <Link to={`/bikes/${media.bike.id}`} className="sourceBike">{media.bike.name}</Link>
        : null}
    </>;

    if (!media?.video) {
        return <div className={"photo" + (!media ? " emptyPhoto" : "") + (!openInLightbox ? " disabledLightbox" : "")} onClick={openInLightbox ? () => openInLightbox() : () => {}}>{contents}</div>
    } else {
        return <a target="_blank" rel="noreferrer" href={media.video} className={"photo" + (!media ? " emptyPhoto" : "")}>{contents}</a>
    }
}

/**
 * Photo grid component
 * @property {object} props - React props
 * @property {integer} columns - Grid column amount
 * @property {boolean} disableLightbox - Disable lightbox for photo grid
 */
export default function PhotoGrid({photos, columns, disableLightbox}) {
    console.log(photos)
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    
    // Format photo URLs for the lightbox only. The lightbox wants just an array of image url strings.
    const lightboxPhotoUrls = photos.map((media) => {
        if (!media?.image) return null; // -- or maybe this should return a placeholder image to keep the order? ... if any problems will be caused

        const url = (media.image.startsWith('/static/media/') ? media.image : api.getPhotoUrl(media.image))

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
                    <Photo key={photo} media={photo} openInLightbox={(!disableLightbox ? () => viewLightbox(index) : null)} />
                ))}
            </div>
            {isOpen && (
            <Lightbox
                mainSrc={lightboxPhotoUrls[photoIndex]}
                nextSrc={lightboxPhotoUrls[(photoIndex + 1) % lightboxPhotoUrls.length]}
                prevSrc={lightboxPhotoUrls[(photoIndex + lightboxPhotoUrls.length - 1) % lightboxPhotoUrls.length]}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() =>
                    setPhotoIndex((photoIndex + lightboxPhotoUrls.length - 1) % lightboxPhotoUrls.length)
                }
                onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % lightboxPhotoUrls.length)
                }
            />
            )}
        </>
    );
}