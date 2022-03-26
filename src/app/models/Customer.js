const { Model, DataTypes } = require('sequelize');

module.exports = class Customer extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  static associatie(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.hasOne(models.Address, { foreignKey: 'customerId', as: 'address' });
    this.hasOne(models.Cart, { foreignKey: 'customerId', as: 'cart' });
  }
};
