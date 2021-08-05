import config from './config'
const env = process.env.NODE_ENV==='development' || false;
const apiServer = env ? config.apiEndpoint : '/api';

async function getAllBikes() {
    const response = await fetch(`${apiServer}/bikes`).then(res => res.json());

    if (!response.status) return [];
    console.log(response.bikes);
    return response.bikes;
}

async function getBike(bikeId) {
    const response = await fetch(`${apiServer}/bikes/${bikeId}`).then(res => res.json());
    
    if (!response.status) return {};
    return response;
}

function getPhotoUrl(photoId) {
    // to-do: make this work on localhost by checking for NODE_ENV (needs ngrok, so that the image proxy will reach it)
    return `${apiServer}/uploads/${photoId}`;
}

const api = {
    getAllBikes,
    getBike,
    getPhotoUrl
};

export default api;