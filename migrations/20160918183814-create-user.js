'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Requesting: {
        type: Sequelize.STRING
      },
      From: {
        type: Sequelize.STRING
      },
      To: {
        type: Sequelize.STRING
      },
      Day: {
        type: Sequelize.INTEGER
      },
      Time: {
        type: Sequelize.INTEGER
      },
      Seats: {
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.INTEGER
      },
      Mobile: {
        type: Sequelize.INTEGER
      },
      Email: {
        type: Sequelize.STRING
      },
      NonsmokeCar: {
        type: Sequelize.STRING
      },
      Notes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
