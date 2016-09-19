'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }
  hooks: {
     beforeCreate: function(createdUser, options, cb) {
       // hash the password
       var hash = bcrypt.hashSync(createdUser.password, 10);
       // store the hash as the user's password
       createdUser.password = hash;
       // continue to save the user, with no errors
       cb(null, createdUser);
     }
   },
   classMethods: {
     associate: function(models) {
       // associations can be defined here
     }
   }
 });
 return user;
 };
