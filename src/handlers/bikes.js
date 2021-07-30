const responseUtils = require("../utils/response_utilities");
const uuid = require("uuid");
const locationClient = require('../location/client');

/**
 * Get single bike using ID
 * @param req
 * @param res
 * @param db
 * @param admin Return all fields, including secret ones
 * @returns {Promise<void>}
 */
async function get(req, res, db, admin) {
    try {
        if (req.params.bikeId) {
            let bike = await db.getBike(req.params.bikeId, admin);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, {cause: 'Bike does not exist!'})
                return;
            }
            let newBike = JSON.parse(JSON.stringify(bike));
            newBike.locations = newBike.location.map(i => {
                i.bikeId=undefined;
                delete i.bikeId;
                return i;
            });
            newBike.location = newBike.location[0] || null;
            if (newBike.location) {
                newBike.location.bikeId=undefined;
                delete newBike.location.bikeId;
            }
            responseUtils.responseStatus(res, 200, true, {bike: newBike});
        } else {
            responseUtils.responseStatus(res, 400, false, {cause: 'No bikeId supplied in request'})
        }
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
    }
}

/**
 * Add new bike
 * *Required authentication*
 * @param req
 * @param res
 * @param db
 * @returns {Promise<void>}
 */
async function put(req, res, db) {
    try {
        if (req.body.name && req.body.desc) {
            let bike = await db.addBike(req.body.name, req.body.desc)
            responseUtils.responseStatus(res, 200, true, {bike});
        } else {
            responseUtils.responseStatus(res, 400, false, {cause: 'No sufficient parameters supplied'})
        }
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
    }
}

/**
 * Add location to a bike
 * *Required authentication*
 * @param req
 * @param res
 * @param db
 * @returns {Promise<void>}
 */
async function putLocation(req, res, db) {
    try {
        if (req.params.bikeId && parseFloat(req.body.lat) && parseFloat(req.body.lon)) {
            let bike = await db.getBike(req.params.bikeId);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, {cause: 'Bike does not exist!'})
                return;
            }
            let locationName = (await locationClient.nominatimReserveSearchPlaceName(req.body.lat, req.body.lon)) || "Unknown";
            let location = await db.addLocation(locationName, parseFloat(req.body.lat), parseFloat(req.body.lon), req.params.bikeId);
            responseUtils.responseStatus(res, 200, true, {location});
        } else {
            responseUtils.responseStatus(res, 400, false, {cause: 'No sufficient parameters supplied'})
        }
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
    }
}

/**
 * Delete bike
 * *Required authentication*
 * @param req
 * @param res
 * @param db
 * @returns {Promise<void>}
 */
async function deleteBike(req, res, db) {
    try {
        if (req.params.bikeId) {
            let bike = await db.getBike(req.params.bikeId);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, {cause: 'Bike does not exist!'})
                return;
            }
            await db.deleteBike(req.params.bikeId);
            responseUtils.responseStatus(res, 200, true);
        } else {
            responseUtils.responseStatus(res, 400, false, {cause: 'No sufficient parameters supplied'})
        }
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
    }
}

/**
 * Delete location
 * *Required authentication*
 * @param req
 * @param res
 * @param db
 * @returns {Promise<void>}
 */
async function deleteLocation(req, res, db) {
    try {
        if (req.params.id) {
            let bike = await db.getLocation(req.params.id);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, {cause: 'Location does not exist!'})
                return;
            }
            await db.deleteLocation(req.params.id);
            responseUtils.responseStatus(res, 200, true);
        } else {
            responseUtils.responseStatus(res, 400, false, {cause: 'No sufficient parameters supplied'})
        }
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
    }
}

/**
 * List all bikes
 * @param req
 * @param res
 * @param db
 * @param admin Return all fields, including secret ones
 * @returns {Promise<void>}
 */
async function list(req, res, db, admin=false) {
    try {
        let bikes = (await db.getBikes(!admin)).map(i => {
            // Dirty hack to manipulate object
            let k = JSON.parse(JSON.stringify(i));
            k.location = k.location[0] || null;
            if (k.location) {
                k.location.bikeId=undefined;
                delete k.location.bikeId;
            }
            return k;
        });
        responseUtils.responseStatus(res, 200, true, {bikes});
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
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