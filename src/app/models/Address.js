const { Model, DataTypes } = require('sequelize');

module.exports = class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        number: DataTypes.INTEGER,
        street: DataTypes.STRING,
        district: DataTypes.STRING,
        city: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        complement: DataTypes.STRING,
      },
      { sequelize }
    );
  }

  static associatie(models) {
    this.belongsTo(models.Custumer, {
      foreignKey: 'customerId',
      as: 'custumer',
    });
  }
};
