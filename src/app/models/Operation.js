const { Model, DataTypes } = require('sequelize');

module.exports = class Operation extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  static associatie(models) {
    this.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
    this.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  }
};
