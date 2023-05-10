// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

('use strict');

const manufacturer = ['Acer', 'Asus', 'Dell', 'MSI', 'Lenovo', 'Apple'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Laptops',
      [...Array(100)].map(() => ({
        name: faker.lorem.sentence(2),
        vendor_code: faker.internet.password(),
        price: faker.random.numeric(5),
        in_stock: faker.random.numeric(2),
        bestseller: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        manufacturer: manufacturer[Math.floor(Math.random() * manufacturer.length)],
        description: faker.lorem.sentence(10),
        images: JSON.stringify([...Array(7)].map(() => `${faker.image.technics()}?random=${faker.random.numeric(30)}`)),
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
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
