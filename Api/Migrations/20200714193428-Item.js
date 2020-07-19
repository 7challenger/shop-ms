'use strict';

/* eslint-disable */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Items', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },

      image: Sequelize.DataTypes.STRING,
      siteUrl: Sequelize.DataTypes.STRING,

      // info
      name: Sequelize.DataTypes.STRING,
      description: Sequelize.DataTypes.STRING,

      // price
      currentPrice: Sequelize.DataTypes.STRING,
      initialPrice: Sequelize.DataTypes.STRING,
    });

    // return queryInterface.sequelize.transaction(t => {
    //   return Promise.all([
    //     queryInterface.addColumn('Person', 'petName', {
    //       type: Sequelize.DataTypes.STRING
    //     }, { transaction: t }),
    //     queryInterface.addColumn('Person', 'favoriteColor', {
    //       type: Sequelize.DataTypes.STRING,
    //     }, { transaction: t })
    //   ]);
    // });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Items');
  }
};
