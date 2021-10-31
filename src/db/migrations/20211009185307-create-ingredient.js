'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ingredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      id_unit_measurement: {
        type: Sequelize.INTEGER,
        references: {
          model: 'unit_measurements',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      id_ingredient_states: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ingredient_states',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      id_ingredient_types: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ingredient_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
        'ingredients',
        ['id_unit_measurement']
      );
      queryInterface.addIndex(
        'ingredients',
        ['id_ingredient_states']
      );
      queryInterface.addIndex(
        'ingredients',
        ['id_ingredient_types']
      );
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ingredients');
  }
};