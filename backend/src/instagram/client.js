/* tslint:disable:no-console */
const { IgApiClient } = require('instagram-private-api');
const sharp = require('sharp');

const ig = new IgApiClient();


async function login(username, password) {
    ig.state.generateDevice(username);
    await ig.account.login(username, password);
}

async function post(image, location) {
    try {
        await login(process.env.INSTAGRAM_USER, process.env.INSTAGRAM_PASS);

        // Rework image to correct aspect ratio
        const img = await sharp(image)
            .resize({
                fit: sharp.fit.cover,
                height: 900,
                width: 900
            })
            .jpeg({ quality: 80 })
            .toBuffer()

        const locations = await ig.search.location(location.lat, location.lon);

        let mediaLocation = undefined;
        if (locations.length > 0)
            mediaLocation = locations[0];

        await ig.publish.photo({
            file: img,
            caption: `QR-Pyörä ${location.name ? location.name : ''}`,
            location: mediaLocation,
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    post
}