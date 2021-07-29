const responseUtils = require("../utils/response_utilities");
const uuid = require("uuid");


async function get(req, res, db) {
    try {
        if (req.params.bikeId) {
            let bike = await db.getBike(req.params.bikeId);
            if (bike == null) {
                responseUtils.responseStatus(res, 404, false, {cause: 'Bike does not exist!'})
                return;
            }
            bike.secret = undefined;
            delete bike.secret;
            responseUtils.responseStatus(res, 200, true, {bike});
        } else {
            responseUtils.responseStatus(res, 400, false, {cause: 'No bikeId supplied in request'})
        }
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
    }
}

async function list(req, res, db) {
    try {
        let bikes = await db.getBikes();
        responseUtils.responseStatus(res, 200, true, {bikes: bikes.map(i => {i.secret=undefined;delete i.secret;return i;})});
    } catch (e) {
        let errorUid = uuid.v4();
        console.error(errorUid, ": ", e);
        responseUtils.responseStatus(res, 500, false, {cause: 'Internal server error, id: '+errorUid})
    }
}

module.exports = {
    list,
    get
}