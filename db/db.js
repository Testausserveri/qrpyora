const dbController = require("./controller")
const models = require("./models/all")

class Database {
    dbSession;
    models;
    constructor(dbname, username, password, host='localhost') {
        this.dbSession = dbController.openDBConnection(dbname, username, password, host);
        this.models = {}
    }

    async connect() {
        try {
            await this.dbSession.authenticate();
            console.log('Database Connection has been established successfully.');
            this.models.bikes = models.defineBikes(this.dbSession);
            this.models.photos = models.definePhotos(this.dbSession);
            this.models.photos.belongsTo(this.models.bikes);
            await this.dbSession.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(-1);
        }
    }

    getBikes() {
        return this.models.bikes.findAll();
    }

    bikeExists(id) {
        return new Promise((resolve, reject) => {
            this.models.bikes.findAll({
                where: {
                    id
                }
            }).then(function (data) {
                resolve(data === undefined ? false : data.length > 0);
            }).catch(err => {reject(err)});
        })
    }

    getBike(id) {
        return new Promise((resolve, reject) => {
            this.models.bikes.findAll({
                where: {
                    id
                }
            }).then(function (data) {
                resolve(data === undefined ? null : data[0]);
            }).catch(err => {reject(err)});
        })
    }

    addPicture(fileName, bikeId) {
        return this.models.photos.create({fileName, bikeId});
    }

    getPhotosForBike(bikeId) {
        return this.models.photos.findAll({
            where: {
                bikeId
            }
        })
    }

}

module.exports = {
    Database: Database
}