const superagent = require('superagent');

// Note from Esinko
// This function is *weird* no idea what it does, but it *needs* error handling.
// Somebody fix this please...

function nominatimReserveSearchPlaceName(lat, lon) {
    return superagent.get(global.nominatimUrl+`/reverse?lat=${parseFloat(lat)}&lon=${parseFloat(lon)}&accept-language=fi&format=json`)
        .then(res => {
            if (res.body.address) {
                let keys = Object.keys(res.body.address);
                if (keys[0] === "house_number" && keys.length > 1) {
                    return `${res.body.address[keys[1]]} ${res.body.address[keys[0]]}, ${keys.splice(2, 1).map(i => {return res.body.address[i]})}`;
                }
                return keys.splice(0, 2).map(i => {return res.body.address[i]}).join(", ");
            } else if (res.body.display_name) {
                return res.body.display_name.split(",").splice(0, 2).join(", ");
            }
            return null;
        });
}

module.exports = {
    nominatimReserveSearchPlaceName
}