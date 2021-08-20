import config from './config'
const env = process.env.NODE_ENV==='development' || false;
const apiServer = env ? config.apiEndpoint : '/api';
const imgServer = env ? config.apiEndpoint : window.location.origin;

async function getAllBikes() {
    const response = await fetch(`${apiServer}/bikes`).then(res => res.json());

    if (!response.status) return [];
    console.log(response.bikes);
    return response.bikes;
}

async function getAllPhotos() {
    const response = await fetch(`${apiServer}/gallery`).then(res => res.json());

    if (!response.status) return [];
    console.log(response.pictures);
    return response.pictures;
}

async function getBike(bikeId) {
    const response = await fetch(`${apiServer}/bikes/${bikeId}`).then(res => res.json());
    
    if (!response.status) return {};
    return response;
}

async function uploadPicture(bikeId, secret, image, onProgress) {
    // I tried using Fetch API for this first
    // but currently they don't have support
    // for reading progress yet.

    return new Promise((resolve, reject) => {
        let data = new FormData();
        data.append('picture', image);
        data.append('secret', secret);

        let request = new XMLHttpRequest();
        request.open('PUT', `${apiServer}/bikes/${bikeId}/pictures/upload`); 

        request.upload.addEventListener('progress', function(e) {
            let percent_completed = (e.loaded / e.total)*100;
            onProgress(percent_completed);
        });

        // Finished
        request.addEventListener('load', function(e) {
            console.log(request.status);
            console.log(request.response);
            resolve(request.response)
        });

        request.send(data);
    })
}

function getPhotoUrl(photoId) {
    return `${imgServer}/uploads/${photoId}`;
}

const api = {
    getAllBikes,
    getBike,
    getPhotoUrl,
    uploadPicture,
    getAllPhotos
};

export default api;