const { Sequelize } = require('sequelize');

function openDBConnection(dbname, username, password, host) {
    return new Sequelize(dbname, username, password, {
        host: host,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        dialect: 'mysql',
        logging: false
    });
}


module.exports = {
    openDBConnection: openDBConnection
}