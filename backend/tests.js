
const locationClient = require('./src/location/client');

const config = require("./config.json");
const assert = require("assert");
global.nominatimUrl = config.nominatimUrl;

async function locationTest() {
    let name = await locationClient.nominatimReserveSearchPlaceName(61.06213413678233, 28.190886072212503);
    let name2 = await locationClient.nominatimReserveSearchPlaceName( 60.167607, 24.953903);
    console.log(name);
    assert(name === "Ainonkatu 12, Kylpylä");
    console.log(name2);
    assert(name2 === "Kauppatori, Pohjoisesplanadi");
}

locationTest();