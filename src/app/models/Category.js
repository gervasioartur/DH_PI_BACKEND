const { Model, DataTypes } = require('sequelize');

module.exports = class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associatie(models) {
    this.hasOne(models.Product, { foreignKey: 'categoriesId', as: 'product' });
  }
};
