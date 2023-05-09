const { faker } = require('@faker-js/faker');


'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Laptops', [...Array(100)].map(() => ({
      name: faker.name.firstName(),
      vendor_code: faker.internet.password(),
      price: faker.random.numeric(),
      in_stock: faker.random.numeric(),
      bestseller: false,
      new: false,
      manufacturer: faker.lorem.sentence(2),
      description: faker.lorem.sentence(2),
      images: faker.image.technics(1234, 2345, true),
      createdAt: new Date(),
      updatedAt: new Date()
    })));
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Laptops', null, {});
  }
};
/*
name: faker.name.firstName(),
  vendor_code: fa,
  price: 112312,
  in_stock: 142141,
  bestseller: false,
  new: false,
  manufacturer: "fsafsaf",
  description: 'dsadasd',
  images: 'dasdasd',
  createdAt: new Date(),
  updatedAt: new Date()*/
