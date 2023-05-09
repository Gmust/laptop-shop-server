'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Laptops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      vendor_code: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      in_stock: {
        type: Sequelize.INTEGER
      },
      bestseller: {
        type: Sequelize.BOOLEAN
      },
      new: {
        type: Sequelize.BOOLEAN
      },
      manufacturer: {
        type: Sequelize.STRING(2048)
      },
      description: {
        type: Sequelize.STRING(2048)
      },
      images: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Laptops');
  }
};