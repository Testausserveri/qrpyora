
function reFormatBike(bike) {
    let newBike = JSON.parse(JSON.stringify(bike));
    newBike.locations = newBike.location.map(i => {
        i.bikeId = undefined;
        delete i.bikeId;
        return i;
    }).reverse();
    // Put the damn photos in right order
    newBike.photos = newBike.photos.sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id);
    });
    // Apparently locations have hard time to index :D
    newBike.locations = newBike.locations.sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id);
    });
    newBike.location = newBike.locations[0] || null;
    if (newBike.location) {
        newBike.location.bikeId = undefined;
        delete newBike.location.bikeId;
    }
    return newBike;
}

module.exports = {
    reFormatBike
}