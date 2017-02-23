'use strict';

require('dotenv').config();

var env = process.env.NODE_ENV || 'development';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = require('../../config/Config.json')[env];

var basename = path.basename(module.filename);
var db = {};

var sequelize = config.use_env_constiable ? new Sequelize(process.env[config.use_env_constiable]) : new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'Index.js' && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;