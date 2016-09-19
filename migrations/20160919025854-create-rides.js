'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('rides', {
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
      Date: {
        type: Sequelize.DATE
      },
      Time: {
        type: Sequelize.TIME
      },
      Seats: {
        type: Sequelize.INTEGER
      },
      Mobile: {
        type: Sequelize.INTEGER
      },
      Email: {
        type: Sequelize.STRING
      },
      NonSmokeCar: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('rides');
  }
};