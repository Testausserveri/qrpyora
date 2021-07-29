const express = require("express");
const {Database} = require("./db/db");
const config = require('./config.json')
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require('cors');
const multer = require("multer");
const rateLimit = require("express-rate-limit");
let upload = multer();
const dbConnection = new Database(config.db.dbname, config.db.username, config.db.password, config.db.host);

const pictureHandler = require('./src/handlers/picture')
const bikeHandler = require('./src/handlers/bikes')

app = express();
app.use(bodyParser.json());
app.use(cors());


const imageRateLimit = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 5,
    message: {status: false, cause: "Too many requests, try again later."}
});

app.get('/bikes/:bikeId/pictures', (req, res) => {pictureHandler.list(req, res, dbConnection)})
app.get('/bikes/', (req, res) => {bikeHandler.list(req, res, dbConnection)})
app.get('/bikes/:bikeId', (req, res) => {bikeHandler.get(req, res, dbConnection)})
app.put('/picture/upload', imageRateLimit, upload.single('picture'),  (req, res) => {pictureHandler.upload(req, res, dbConnection)})


app.get('*', function(req, res){
    res.status(404).json({'status': false, 'cause': "not found"});
});


dbConnection.connect().then(() => {
    console.log(`Listening on port ${port}`)
    app.listen(port);
})
