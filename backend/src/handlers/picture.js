let responseUtils = require('../utils/response_utilities');
const sharp = require("sharp")
const uuid = require('uuid');

async function upload(req, res, db) {
    try {
        if (req.file && req.body && req.params.bikeId) {
            let bike = await db.getBike(req.params.bikeId, true);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, {cause: 'Bike does not exist!'})
                return;
            }
            if (!req.body.secret || req.body.secret !== bike.secret) {
                responseUtils.responseStatus(res, 401, false, {cause: 'Invalid secret!'});
                return;
            }
            const { buffer } = req.file;
            let fileName = uuid.v4()+".jpg";
            let picture = await db.addPicture(fileName, req.params.bikeId);
            await sharp(buffer)
                .metadata()
                .then(meta => {
                    let sharpImg;
                    if (meta.width > 1500 || meta.height > 1500) {
                        sharpImg =  sharp(buffer).resize(meta.width > meta.height ? 1500 : undefined, meta.height > meta.width ? 1500 : undefined)
                    } else {
                        sharpImg = sharp(buffer);
                    }
                    sharpImg
                        .jpeg()
                        .toFile("./static/" + fileName).then(() => {
                        responseUtils.responseStatus(res, 200, true, {picture});
                    });
                })

        } else {
            responseUtils.responseStatus(res, 400, false, {cause: 'No picture supplied in request'})
        }
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
    }
}

async function list(req, res, db) {
    try {
        if (req.params.bikeId) {
            let bikeExists = await db.bikeExists(req.params.bikeId);
            if (!bikeExists) {
                responseUtils.responseStatus(res, 404, false, {cause: 'Bike does not exist!'})
                return;
            }
            let pictures = await db.getPhotosForBike(req.params.bikeId);
            responseUtils.responseStatus(res, 200, true, {pictures});
        } else {
            responseUtils.responseStatus(res, 400, false, {cause: 'Insufficient request parameters'})
        }
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
    }
}

async function deletePicture(req, res, db) {
    try {
        if (req.params.id) {
            let picture = await db.getPicture(req.params.id);
            if (picture == null) {
                responseUtils.responseStatus(res, 404, false, {cause: 'Picture does not exist!'})
                return;
            }
            await db.deletePicture(req.params.id);
            responseUtils.responseStatus(res, 200, true);
        } else {
            responseUtils.responseStatus(res, 400, false, {cause: 'Insufficient request parameters'})
        }
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
    }
}


module.exports = {
    upload,
    list,
    deletePicture
}