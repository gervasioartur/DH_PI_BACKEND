const { Model, DataTypes } = require('sequelize');

module.exports = class ProductCart extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  static associatie(models) {}
};
