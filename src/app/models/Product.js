const { Model, DataTypes } = require('sequelize');

module.exports = class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        description: DataTypes.STRING,
        images: DataTypes.ARRAY(DataTypes.STRING),
      },
      { sequelize }
    );
  }

  static associatie(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'categoriesId',
      as: 'category',
    });
  }
};
