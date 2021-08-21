const superagent = require('superagent');
const reFormatters = require("../utils/reformatters");

function discordWebHook(bike, url, timestamp) {
    if (global.hookUrl.trim().length === 0) return;
    const newBike = reFormatters.reFormatBike(bike);
    return superagent.post(global.hookUrl)
        .send({
                "embeds": [{
                    "image": {
                        "url": url
                    },
                    "timestamp": timestamp,
                    "description": `**${newBike.name}**, sijainti: ${newBike.location.name}`
                }]
            }
        )
        .then(res => {
            return res.status === 204;
        }).catch(err => {
            console.error(err.message, err.response);
            return false;
        });
}

module.exports = {
    discordWebHook
}