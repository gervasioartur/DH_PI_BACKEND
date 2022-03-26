const { Model, DataTypes } = require('sequelize');

module.exports = class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
        isActive: DataTypes.BOOLEAN,
      },
      { sequelize }
    );
  }

  static associatie(models) {
    this.hasMany(models.Admin, { foreignKey: 'userId', as: 'admin' });
    this.hasMany(models.Customer, { foreignKey: 'userId', as: 'customer' });
  }
};
