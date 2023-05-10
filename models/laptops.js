'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laptops extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Laptops.init(
    {
      name: DataTypes.STRING,
      vendor_code: DataTypes.STRING,
      price: DataTypes.INTEGER,
      in_stock: DataTypes.INTEGER,
      bestseller: DataTypes.BOOLEAN,
      new: DataTypes.BOOLEAN,
      manufacturer: DataTypes.STRING,
      description: DataTypes.STRING,
      images: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Laptops'
    }
  );
  return Laptops;
};
