const { Model, DataTypes } = require('sequelize');

module.exports = class Admin extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  static associatie(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

    this.hasMany(models.Operation, {
      foreignKey: 'adminId',
      as: 'operation',
    });
  }
};
