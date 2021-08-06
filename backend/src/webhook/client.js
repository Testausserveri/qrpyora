const superagent = require('superagent');

function discordWebHook(url, timestamp) {
    return superagent.post(global.hookUrl)
        .send({
                "embeds": [{
                    "image": {
                        "url": url
                    },
                    "timestamp": timestamp
                }]
            }
        )
        .then(res => {
            return res.status === 204;
        });
}

module.exports = {
    discordWebHook
}