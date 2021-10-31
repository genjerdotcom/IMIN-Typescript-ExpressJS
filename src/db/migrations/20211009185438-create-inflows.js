'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inflows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_ingredient: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ingredients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      reason: {
        type: Sequelize.ENUM('Purchase', 'Recount')
      },
      price: {
        type: Sequelize.NUMERIC
      },
      qty: {
        type: Sequelize.NUMERIC
      },
      additional_details: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      updated_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    }).then(() => {
      queryInterface.addIndex(
        'inflows',
        ['id_ingredient']
      )
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inflows');
  }
};