'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    Requesting: DataTypes.STRING,
    From: DataTypes.STRING,
    To: DataTypes.STRING,
    Day: DataTypes.INTEGER,
    Time: DataTypes.INTEGER,
    Seats: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Phone: DataTypes.INTEGER,
    Mobile: DataTypes.INTEGER,
    Email: DataTypes.STRING,
    Non - smokeCar: DataTypes.STRING,
    Notes: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};