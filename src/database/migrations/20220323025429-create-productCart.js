('use strict');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('productCart', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onupdate: 'CASCADE',
        ondelete: 'CASCADE',
      },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'carts', key: 'id' },
        onupdate: 'CASCADE',
        ondelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('productCart');
  },
};
