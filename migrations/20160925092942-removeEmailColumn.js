'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'rides',
      'Email',
      Sequelize.STRING
    )
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'rides',
      'Email',
      Sequelize.STRING
    )
  }
};
