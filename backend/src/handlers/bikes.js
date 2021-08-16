const responseUtils = require("../utils/response_utilities");
const uuid = require("uuid");
const locationClient = require('../location/client');
const { Request, Response } = require('express');
const reFormatters = require('../utils/reformatters');

/**
 * Get single bike using ID
 * @param {Request} req Incoming request
 * @param {Response} res Response
 * @param db
 * @param admin Return all fields, including secret ones
 * @returns {Promise<void>}
 */
async function get(req, res, db, admin) {
    try {
        if (req.params.bikeId) {
            const bike = await db.getBike(req.params.bikeId, admin);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, { cause: 'Bike does not exist!' });
                return;
            }
            const newBike = reFormatters.reFormatBike(bike);
            responseUtils.responseStatus(res, 200, true, { bike: newBike });
        } else {
            responseUtils.responseStatus(res, 400, false, { cause: 'No bikeId supplied in request' });
        }
    } catch (e) {
        const errorUid = uuid.v4();
        console.error(errorUid, ":", e);
        responseUtils.responseStatus(res, 500, false, { cause: 'Internal server error, id: ' + errorUid });
    }
}

/**
 * Add new bike
 * *Requires authentication*
 * @param {Request} req Incoming request
 * @param {Response} res Response
 * @param db
 * @returns {Promise<void>}
 */
async function put(req, res, db) {
    try {
        if (req.body.name && req.body.desc) {
            const bike = await db.addBike(req.body.name, req.body.desc)
            responseUtils.responseStatus(res, 200, true, { bike });
        } else {
            responseUtils.responseStatus(res, 400, false, { cause: 'No sufficient parameters supplied' })
        }
    } catch (e) {
        const errorUid = uuid.v4();
        console.error(errorUid, ":", e);
        responseUtils.responseStatus(res, 500, false, { cause: 'Internal server error, id: ' + errorUid })
    }
}

/**
 * Add location to a bike
 * *Requires authentication*
 * @param {Request} req Incoming request
 * @param {Response} res Response
 * @param db
 * @returns {Promise<void>}
 */
async function putLocation(req, res, db) {
    try {
        if (req.params.bikeId && parseFloat(req.body.lat) && parseFloat(req.body.lon)) {
            const bike = await db.getBike(req.params.bikeId);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, { cause: 'Bike does not exist!' })
                return;
            }
            const locationName = (await locationClient.nominatimReserveSearchPlaceName(req.body.lat, req.body.lon)) || 'Unknown';
            const location = await db.addLocation(locationName, parseFloat(req.body.lat), parseFloat(req.body.lon), req.params.bikeId);
            responseUtils.responseStatus(res, 200, true, { location });
        } else {
            responseUtils.responseStatus(res, 400, false, { cause: 'No sufficient parameters supplied' })
        }
    } catch (e) {
        const errorUid = uuid.v4();
        console.error(errorUid, ":", e);
        responseUtils.responseStatus(res, 500, false, { cause: 'Internal server error, id: ' + errorUid })
    }
}

/**
 * Delete bike
 * *Requires authentication*
 * @param {Request} req Incoming request
 * @param {Response} res Response
 * @param db
 * @returns {Promise<void>}
 */
async function deleteBike(req, res, db) {
    try {
        if (req.params.bikeId) {
            const bike = await db.getBike(req.params.bikeId);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, { cause: 'Bike does not exist!' });
                return;
            }
            await db.deleteBike(req.params.bikeId);
            responseUtils.responseStatus(res, 200, true);
        } else {
            responseUtils.responseStatus(res, 400, false, { cause: 'Insufficient parameters supplied' });
        }
    } catch (e) {
        const errorUid = uuid.v4();
        console.error(errorUid, ":", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: ' + errorUid});
    }
}

/**
 * Delete location
 * *Requires authentication*
 * @param {Request} req Incoming request
 * @param {Response} res Response
 * @param db
 * @returns {Promise<void>}
 */
async function deleteLocation(req, res, db) {
    try {
        if (req.params.id) {
            const bike = await db.getLocation(req.params.id);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, { cause: 'Location does not exist!' });
                return;
            }
            await db.deleteLocation(req.params.id);
            responseUtils.responseStatus(res, 200, true);
        } else {
            responseUtils.responseStatus(res, 400, false, { cause: 'No sufficient parameters supplied' });
        }
    } catch (e) {
        const errorUid = uuid.v4();
        console.error(errorUid, ":", e);
        responseUtils.responseStatus(res, 500, false, { cause: 'Internal server error, id: ' + errorUid })
    }
}

/**
 * List all bikes
 * @param {Request} req Incoming request
 * @param {Response} res Response
 * @param db
 * @param admin Return all fields, including secret ones
 * @returns {Promise<void>}
 */
async function list(req, res, db, admin=false) {
    try {
        const bikes = (await db.getBikes(!admin)).map(i => {
            // Dirty hack to manipulate object
            const k = JSON.parse(JSON.stringify(i));
            // Apparently locations have hard time to index :D
            k.location = k.location.sort((a, b) => {
                return parseInt(b.id) - parseInt(a.id);
            });
            k.location = k.location[0] || null;
            if (k.location) {
                k.location.bikeId=undefined;
                delete k.location.bikeId;
            }
            return k;
        });
        responseUtils.responseStatus(res, 200, true, { bikes });
    } catch (e) {
        const errorUid = uuid.v4();
        console.error(errorUid, ":", e);
        responseUtils.responseStatus(res, 500, false, { cause: 'Internal server error, id: ' + errorUid });
    }
}

module.exports = {
    list,
    get,
    put,
    deleteBike,
    putLocation,
    deleteLocation
}