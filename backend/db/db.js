const dbController = require("./controller")
const models = require("./models/all")
const uuid = require('uuid');
const {Sequelize} = require("sequelize");

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
            this.models.locations = models.defineLocations(this.dbSession);
            this.models.photos.belongsTo(this.models.bikes);
            this.models.bikes.hasMany(this.models.locations, {as: 'location'});
            this.models.bikes.hasMany(this.models.photos, {as: 'photos'});
            await this.dbSession.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(-1);
        }
    }

    getBikes(removeUnnecessaryInfo=true) {
        return this.models.bikes.findAll({
            include: [
                {
                    model: this.models.locations,
                    as: 'location',
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                },
                {
                    model: this.models.photos,
                    as: 'photos',
                    limit: 4,
                    order: [['id', 'DESC']],
                    attributes: ['fileName'],
                },
            ],
            attributes: {
                exclude: removeUnnecessaryInfo ? ['createdAt', 'updatedAt', 'secret'] : [],
                include: [
                    // Get count of pictures in total
                    [
                    Sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM photos AS picture
                    WHERE
                        picture.bikeId = bikes.id)`),
                    'photosCount'
                    ]
                ]
            },
        }).then((bikes) => {
            return bikes.map(function(bike) {
                // Dirty hack to make object manipulative
                bike = JSON.parse(JSON.stringify(bike));
                bike.photos = bike.photos.map(i => {
                    return i.fileName
                });
                return bike;
            })
        });
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

    getBike(id, includeSecret=false) {
        return new Promise((resolve, reject) => {
            this.models.bikes.findAll({
                where: {
                    id
                },
                include: [
                    {
                        model: this.models.locations,
                        as: 'location',
                        attributes: {exclude: ['createdAt', 'updatedAt']},
                    },
                    {
                        model: this.models.photos,
                        as: 'photos',
                        attributes: {exclude: includeSecret ? [] : ['updatedAt', 'bikeId']},
                    },
                ],
                attributes: {exclude: ['createdAt', 'updatedAt', includeSecret ? undefined : 'secret']}
            }).then(function (data) {
                resolve(data === undefined ? null : data[0]);
            }).catch(err => {reject(err)});
        })
    }

    getPicture(id) {
        return new Promise((resolve, reject) => {
            this.models.photos.findAll({
                where: {
                    id
                }
            }).then(function (data) {
                resolve(data === undefined ? null : data[0]);
            }).catch(err => {reject(err)});
        })
    }

    getLocation(id) {
        return new Promise((resolve, reject) => {
            this.models.locations.findAll({
                where: {
                    id
                }
            }).then(function (data) {
                resolve(data === undefined ? null : data[0]);
            }).catch(err => {reject(err)});
        })
    }

    deletePicture(id) {
        return this.models.photos.destroy({
            where: {
                id
            }
        });
    }

    deleteLocation(id) {
        return this.models.locations.destroy({
            where: {
                id
            }
        });
    }

    deleteBike(id) {
        return this.models.bikes.destroy({
            where: {
                id
            }
        });
    }

    addBike(name, desc) {
        return this.models.bikes.create({secret: uuid.v4(), name, desc});
    }

    addLocation(name, lat, lon, bikeId) {
        return this.models.locations.create({name, lat, lon, bikeId});
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