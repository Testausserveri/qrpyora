// Setup environment
if (!process.env.MYSQL_PASSWORD) require('dotenv').config({ path: '../.env' });

// Dependencies
const express = require("express");
const cors = require('cors');
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const { Database } = require("./db/db");
const basicAuth = require('express-basic-auth');

// Internal dependencies
const pictureHandler = require('./src/handlers/picture')
const bikeHandler = require('./src/handlers/bikes')

// General configuration
const adminConfig = JSON.parse(process.env.ADMIN);
const port = process.env.PORT || 8000;
const upload = multer();
const dbConnection = new Database(
    process.env.MYSQL_NAME, 
    process.env.MYSQL_USERNAME, 
    process.env.MYSQL_PASSWORD, 
    process.env.MYSQL_HOST
);

// Webserver confirmation
const app = express();
app.use(express.json());
app.use(cors());

const imageRateLimit = rateLimit({
    windowMs: 1 /* minutes */ * 60 * 1000,
    max: 5,
    message: {
        status: false, 
        cause: "Too many requests, try again later."
    }
});

const adminAuth = basicAuth({
    users: adminConfig,
    challenge: true,
    unauthorizedResponse: () => {
        return {'status': false, 'cause': "Unauthorized"};
    }
});


// Globals setup
global.staticPath = __dirname+'/static';
global.nominatimUrl = process.env.NOMINATIM_URL;
global.hookUrl = process.env.WEBHOOK_URL;
global.endpointUrl = process.env.PROD_ENDPOINT;


// Webserver admin functions
app.put('/bikes', adminAuth, (req, res) => bikeHandler.put(req, res, dbConnection))
app.get('/bikes/admin', adminAuth, (req, res) => bikeHandler.list(req, res, dbConnection, true))
app.delete('/bikes/admin/:bikeId', (req, res) => bikeHandler.deleteBike(req, res, dbConnection))
app.get('/bikes/admin/:bikeId', adminAuth, (req, res) => bikeHandler.get(req, res, dbConnection, true))
app.delete('/pictures/:id', (req, res) => pictureHandler.deletePicture(req, res, dbConnection))
app.put('/bikes/admin/:bikeId/location', adminAuth, (req, res) => bikeHandler.putLocation(req, res, dbConnection))
app.delete('/location/:id', adminAuth, (req, res) => bikeHandler.deleteLocation(req, res, dbConnection))
app.put('/bikes/admin/:bikeId/pictures/upload', adminAuth,  upload.single('picture'),  (req, res) => pictureHandler.upload(req, res, dbConnection, false))

// Webserver public functions
if (process.env.NODE_ENV === 'development') app.use('/uploads', express.static(__dirname + '/static'))
app.get('/bikes/:bikeId/pictures', (req, res) => pictureHandler.list(req, res, dbConnection))
app.get('/bikes', (req, res) => bikeHandler.list(req, res, dbConnection))
app.get('/bikes/:bikeId', (req, res) => bikeHandler.get(req, res, dbConnection))
app.get('/bikes/:bikeId/all', (req, res) => bikeHandler.get(req, res, dbConnection))
app.put('/bikes/:bikeId/pictures/upload', imageRateLimit,  upload.single('picture'),  (req, res) => pictureHandler.upload(req, res, dbConnection))

app.use((req, res) => {
    res.status(404).send(JSON.stringify({status: false, cause: 'Not found'}))
})


dbConnection.connect().then(() => {
    console.log(`Listening on port ${port}`)
    app.listen(port);
})
