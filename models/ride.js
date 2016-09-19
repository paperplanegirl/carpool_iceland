'use strict';
module.exports = function(sequelize, DataTypes) {
  var rides = sequelize.define('rides', {
    Requesting: DataTypes.STRING,
    From: DataTypes.STRING,
    To: DataTypes.STRING,
    Date: DataTypes.DATE,
    Time: DataTypes.TIME,
    Seats: DataTypes.INTEGER,
    Mobile: DataTypes.INTEGER,
    Email: DataTypes.STRING,
    NonSmokeCar: DataTypes.BOOLEAN,
    Notes: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return rides;
};