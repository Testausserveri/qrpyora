const {DataTypes } = require('sequelize');

function defineBikes(sequelize) {
    return sequelize.define('bikes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        secret: {
            type: DataTypes.UUID,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}

function defineLocations(sequelize) {
    return sequelize.define('locations', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        bikeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        lon: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
    });
}

function definePhotos(sequelize) {
    return sequelize.define('photos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}

module.exports = {
    defineBikes,
    definePhotos,
    defineLocations
}