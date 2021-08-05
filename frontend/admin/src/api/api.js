import Auth from './auth'
import config from './config'
const env = process.env.NODE_ENV==='development' || false;
const apiServer = env ? config.apiEndpoint : '/api';


const getAuthHeaders = (auth) => {
    let headers = new Headers();
    headers.set('Authorization', `Basic ${Buffer.from((auth.username + ":" + auth.password)).toString('base64')}`)
    return headers;
}

const getAuthentication = (auth=undefined) => {
    if (auth === undefined || auth == null)
        auth = Auth.getAuth(auth)
    if (auth === undefined || auth == null)
        return undefined
    return getAuthHeaders(auth);
}

async function getAllBikes() {
    const response = await fetch(`${apiServer}/bikes`).then(res => res.json());

    if (!response.status) return [];
    return response.bikes;
}

async function checkAuth(credentials=undefined) {
    const response = await fetch(`${apiServer}/bikes/admin`, {headers: getAuthentication(credentials)});
    return response.status === 200;
}

async function getBike(bikeId) {
    const response = await fetch(`${apiServer}/bikes/admin/${bikeId}`, {headers: getAuthentication()}).then(res => res.json());
    
    if (!response.status) return {};
    return response;
}

async function deletePicture(id) {
    const response = await fetch(`${apiServer}/pictures/${id}`, {method: 'DELETE', headers: getAuthentication()}).then(res => res.json());
    return response.status;
}

async function deleteBike(id) {
    const response = await fetch(`${apiServer}/bikes/admin/${id}`, {method: 'DELETE', headers: getAuthentication()}).then(res => res.json());
    return response.status;
}


async function addLocation(bikeId, location) {
    let auth = getAuthentication();
    auth.set("accept", "application/json");
    auth.set("content-type", "application/json");
    const response = await fetch(`${apiServer}/bikes/admin/${bikeId}/location`, {method: 'PUT', headers: auth, body: JSON.stringify(location)}).then(res => res.json());
    return response.status;
}

async function addBike(bike) {
    let auth = getAuthentication();
    auth.set("accept", "application/json");
    auth.set("content-type", "application/json");
    const response = await fetch(`${apiServer}/bikes`, {method: 'PUT', headers: auth, body: JSON.stringify(bike)}).then(res => res.json());
    return response.status;
}

async function deleteLocation(id) {
    const response = await fetch(`${apiServer}/location/${id}`, {method: 'DELETE', headers: getAuthentication()}).then(res => res.json());
    return response.status;
}

function getPhotoUrl(photoId) {
    return `${apiServer}/static/${photoId}`;
}

const api = {
    getAllBikes,
    getBike,
    getPhotoUrl,
    checkAuth,
    deletePicture,
    addLocation,
    deleteLocation,
    addBike,
    deleteBike
};

export default api;