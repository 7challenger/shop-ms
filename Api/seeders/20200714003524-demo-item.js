module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [{
      image: 'imagesrc',
      siteUrl: 'siteUrl',

      name: 'name',
      description: 'description',

      initialPrice: 'initialPrice',
      currentPrice: 'currentPrice',
    }], { logging: console.log });
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Items', null, {});
  }
};
