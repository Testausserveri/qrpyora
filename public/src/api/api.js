const apiServer = 'https://1716b2cab0ec.ngrok.io'

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
    return `${apiServer}/static/${photoId}`;
}

const api = {
    getAllBikes,
    getBike,
    getPhotoUrl
};

export default api;