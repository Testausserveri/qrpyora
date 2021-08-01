if (!process.env.MYSQL_PASSWORD) require('dotenv').config({ path: '../.env' });
console.log(process.env)

const express = require("express");
const {Database} = require("./db/db");

// to-do: move this into db or create a docker data volume
const config = {
    "adminUsers": {
      "admin": "admin1234"
    }
};

const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require('cors');
const multer = require("multer");
const rateLimit = require("express-rate-limit");
let upload = multer();
const basicAuth = require('express-basic-auth');
const dbConnection = new Database(
    process.env.MYSQL_NAME, 
    process.env.MYSQL_USERNAME, 
    process.env.MYSQL_PASSWORD, 
    process.env.MYSQL_HOST
);

const pictureHandler = require('./src/handlers/picture')
const bikeHandler = require('./src/handlers/bikes')

app = express();
app.use(bodyParser.json());
app.use(cors());

global.staticPath = __dirname+'/static';
global.nominatimUrl = process.env.NOMINATIM_URL;


const imageRateLimit = rateLimit({
    windowMs: 2 * 60 * 1000, // 1 min
    max: 5,
    message: {status: false, cause: "Too many requests, try again later."}
});

const adminAuth = basicAuth({
    users: config.adminUsers,
    challenge: true,
    unauthorizedResponse: () => {
        return {'status': false, 'cause': "Unauthorized"};
    }
});

// Admin functions
app.put('/bikes', adminAuth, (req, res) => {bikeHandler.put(req, res, dbConnection)})
app.get('/bikes/admin', adminAuth, (req, res) => {bikeHandler.list(req, res, dbConnection, true)})
app.delete('/bikes/admin/:bikeId', (req, res) => {bikeHandler.deleteBike(req, res, dbConnection)})
app.get('/bikes/admin/:bikeId', adminAuth, (req, res) => {bikeHandler.get(req, res, dbConnection, true)})
app.delete('/pictures/:id', (req, res) => {pictureHandler.deletePicture(req, res, dbConnection)})
app.put('/bikes/admin/:bikeId/location', adminAuth, (req, res) => {bikeHandler.putLocation(req, res, dbConnection)})
app.delete('/location/:id', adminAuth, (req, res) => {bikeHandler.deleteLocation(req, res, dbConnection)})

// Public functions
app.use('/static', express.static(__dirname + '/static'))
app.get('/bikes/:bikeId/pictures', (req, res) => {pictureHandler.list(req, res, dbConnection)})
app.get('/bikes', (req, res) => {bikeHandler.list(req, res, dbConnection)})
app.get('/bikes/:bikeId', (req, res) => {bikeHandler.get(req, res, dbConnection)})
app.get('/bikes/:bikeId/all', (req, res) => {bikeHandler.get(req, res, dbConnection)})
app.put('/bikes/:bikeId/pictures/upload', imageRateLimit,  upload.single('picture'),  (req, res) => {pictureHandler.upload(req, res, dbConnection)})


app.get('*', function(req, res){
    res.status(404).json({'status': false, 'cause': "not found"});
});


dbConnection.connect().then(() => {
    console.log(`Listening on port ${port}`)
    app.listen(port);
})
