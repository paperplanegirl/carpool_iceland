'use strict'
module.exports = function (sequelize, DataTypes) {
  var rides = sequelize.define('ride', {
    Requesting: DataTypes.STRING,
    From: DataTypes.STRING,
    To: DataTypes.STRING,
    Date: DataTypes.DATE,
    Time: DataTypes.TIME,
    Seats: DataTypes.INTEGER,
    Mobile: DataTypes.INTEGER,
    Email: DataTypes.STRING,
    NonSmokeCar: DataTypes.BOOLEAN,
    Notes: DataTypes.STRING,
    userID: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }, instanceMethods: {
      validPassword: function (password) {
        // return if the password matches the hash
        return bcrypt.compareSync(password, this.password)
      },
      toJSON: function () {
        // get the user's JSON data
        var jsonUser = this.get()
        // delete the password from the JSON data, and return
        delete jsonUser.password
        return jsonUser
      }
    }
  })
  return rides
}
