import { useRef, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import './ImageUploader.css';
import api from '../../api/api';

import ImageBlobReduce from "image-blob-reduce";
const reduce = ImageBlobReduce(); // kiitos antti

export default function ImageUploader({bikeId, secret, onAdded}) {
    const inputFile = useRef(null);

    const [progressVisible, setProgressVisible] = useState(false);
    const progressCircle = useRef(null);
    const progressText = useRef(null);

    async function uploadFile(file) {
        if (!file) return setProgressVisible(false);
        updateProgressBar(0);
        setProgressVisible(true);

        const resizedImage = await reduce.toBlob(file, {
            max: 1500,
            pica: {
                quality: 2
            }
        });

        const response = JSON.parse(await api.uploadPicture(bikeId, secret, resizedImage, (progress) => updateProgressBar(progress)));
        console.log(response)
        if (response.status === true) onAdded(response.picture.fileName);

        setProgressVisible(false);
    }

    function updateProgressBar(value) {
        const r = progressCircle.current.getAttribute('r');
        const c = Math.PI * (r * 2);
        const pct = ((100 - value) / 100) * c;
        
        progressCircle.current.style.strokeDashoffset = pct;
        progressText.current.innerText = Math.floor(value) + '%';
    }

    function openFilePicker() {
        inputFile.current.click();
    }

    return <>
        <div className="progressBarContainer" hidden={!progressVisible}>
            <div className="container">
                <div>
                    <div className="some-wrapper" data-percentage="0">
                        <div className="inner-wrapper">
                            <h1 className="text" ref={progressText}>0%</h1>
                        </div>
                        <svg className="r-progress-bar" width="200" height="200" viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <circle r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset="0"></circle>
                            <circle ref={progressCircle} className="bar" r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" style={{strokeDashoffset: '565.487'}}></circle>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div className="imageUploader">
            <input type="file" id="file" ref={inputFile} style={{display: 'none'}} onChange={(event) => uploadFile(event.target.files[0])} capture="environment" accept="image/*"/>
            <button onClick={() => openFilePicker()} style={{marginBottom: "1rem"}}>
                <span>Lisää kuva</span>
                <span className="buttonIcon">
                    <MdAddAPhoto /> 
                </span>
            </button>
        </div>
    </>;
}