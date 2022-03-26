const { Model, DataTypes } = require('sequelize');

module.exports = class Cart extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  static associatie(models) {
    this.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'custumer',
    });
  }
};
