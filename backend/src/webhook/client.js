const superagent = require('superagent');

function discordWebHook(bike, url, timestamp) {
    return superagent.post(global.hookUrl)
        .send({
                "embeds": [{
                    "image": {
                        "url": url
                    },
                    "timestamp": timestamp,
                    "description": `**${bike.name}**, sijainti: ${bike.location.name}`
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