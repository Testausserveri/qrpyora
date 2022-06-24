let responseUtils = require('../utils/response_utilities');
const sharp = require("sharp")
const uuid = require('uuid');
const path = require("path");
const { Request, Response } = require('express')
const {discordWebHook} = require('../webhook/client')
const instagramClient = require('../instagram/client');
const reFormatters = require("../utils/reformatters");
const fs = require('fs');
const superagent = require('superagent');
async function triggerHook(bike, url, timestamp) {
    await discordWebHook(bike, url, timestamp);
}

/**
 * Upload handler
 * @param {Request} req Incoming request
 * @param {Response} res Response
 * @param {*} db Database construct
 */
async function upload(req, res, db, hook=true) {
    try {
        if (req.file && req.body && req.params.bikeId) {
            const bike = await db.getBike(req.params.bikeId, true);
            const reFormattedBike = reFormatters.reFormatBike(bike);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, { cause: 'Bike does not exist!' });
                return;
            }
            if (!req.body.secret || req.body.secret !== bike.secret) {
                responseUtils.responseStatus(res, 401, false, { cause: 'Invalid secret!' });
                return;
            }
            const { buffer } = req.file;
            const fileName = uuid.v4() + '.jpg';
            let imageBlurred;
            try {
                imageBlurred = Buffer.from((await superagent
                    .post('http://blur:3000/blur')
                    .attach('qrcode', buffer, 'qrpyora.jpg')
                    .set('accept', 'image/jpeg')
                    .buffer(true)
                    .parse(superagent.parse.image)).body, 'binary');
            } catch (e) {
                imageBlurred = buffer;
            }
            const picture = await db.addPicture(fileName, req.params.bikeId);
            const metadata = await sharp(buffer).metadata();
            let sharpImg = sharp(imageBlurred);
            let sharpOgImg = sharp(buffer);
            if (metadata.width > 1500 || metadata.height > 1500) {
                sharpImg = sharpImg.resize(metadata.width > metadata.height ? 1500 : undefined, metadata.height > metadata.width ? 1500 : undefined);
                sharpOgImg = sharpOgImg.resize(metadata.width > metadata.height ? 1500 : undefined, metadata.height > metadata.width ? 1500 : undefined);
            }
            await sharpImg.jpeg().toFile(path.join(global.staticPath, fileName));
            await sharpOgImg.jpeg().toFile(path.join(global.staticPath, `original_${fileName}`));
            if (hook) {
                triggerHook(bike, global.endpointUrl+'/uploads/'+fileName, new Date().toISOString());
                instagramClient.post(fs.readFileSync(path.join(global.staticPath, fileName)), reFormattedBike.location);
            }
            responseUtils.responseStatus(res, 200, true, { picture });
        } else {
            responseUtils.responseStatus(res, 400, false, { cause: 'No picture supplied in request' });
        }
    } catch (e) {
        const errorUid = uuid.v4();
        console.error(errorUid, ":", e);
        responseUtils.responseStatus(res, 500, false, { cause: 'Internal server error, id: ' + errorUid });
    }
}

/**
 * List bikes
 * @param {Request} req Incoming request
 * @param {Response} res Response
 * @param {*} db Database construct 
 */
async function list(req, res, db) {
    try {
        if (req.params.bikeId) {
            const bikeExists = await db.bikeExists(req.params.bikeId);
            if (!bikeExists) {
                responseUtils.responseStatus(res, 404, false, { cause: 'Bike does not exist!' })
                return;
            }
            const pictures = await db.getPhotosForBike(req.params.bikeId);
            responseUtils.responseStatus(res, 200, true, { pictures });
        } else {
            responseUtils.responseStatus(res, 400, false, { cause: 'Insufficient request parameters' })
        }
    } catch (e) {
        const errorUid = uuid.v4();
        console.error(errorUid, ":", e);
        responseUtils.responseStatus(res, 500, false, { cause: 'Internal server error, id: ' + errorUid })
    }
}

/**
 * List all pictures for all bikes in the database
 * @param {Request} req Incoming request
 * @param {Response} res Response
 * @param {*} db Database construct 
 */
 async function listAll(req, res, db) {
    try {
        const pictures = await db.getAllPhotos();
        responseUtils.responseStatus(res, 200, true, { pictures });
    } catch (e) {
        const errorUid = uuid.v4();
        console.error(errorUid, ":", e);
        responseUtils.responseStatus(res, 500, false, { cause: 'Internal server error, id: ' + errorUid })
    }
}

/**
 * Delete a picture
 * @param {Request} req Incoming request
 * @param {Response} res Response
 * @param {*} db Database construct
 * @returns 
 */
async function deletePicture(req, res, db) {
    try {
        if (req.params.id) {
            const picture = await db.getPicture(req.params.id);
            if (picture == null) {
                responseUtils.responseStatus(res, 404, false, { cause: 'Picture does not exist!' })
                return;
            }
            await db.deletePicture(req.params.id);
            responseUtils.responseStatus(res, 200, true);
        } else {
            responseUtils.responseStatus(res, 400, false, { cause: 'Insufficient request parameters' })
        }
    } catch (e) {
        const errorUid = uuid.v4();
        console.error(errorUid, ":", e);
        responseUtils.responseStatus(res, 500, false, { cause: 'Internal server error, id: ' + errorUid })
    }
}


module.exports = {
    upload,
    list,
    listAll,
    deletePicture
}