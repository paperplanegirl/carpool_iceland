'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn('users', 'password1', Sequelize.STRING );

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'password1', Sequelize.STRING );

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
