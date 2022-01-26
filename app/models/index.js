const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool:{
        max: dbConfig.max,
        min:dbConfig.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idel
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('./user.model')(sequelize, Sequelize);

module.exports = db;