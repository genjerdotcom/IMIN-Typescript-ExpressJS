'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ingredient.belongsTo(models.user,{as: '_created_by',foreignKey: 'created_by'})
      ingredient.belongsTo(models.user,{as: '_updated_by',foreignKey: 'updated_by'})
      ingredient.belongsTo(models.unit_measurement,{as: '_unit_measurement',foreignKey: 'id_unit_measurement'})
      ingredient.belongsTo(models.ingredient_states,{as: '_ingredient_states',foreignKey: 'id_ingredient_states'})
      ingredient.belongsTo(models.ingredient_types,{as: '_ingredient_types',foreignKey: 'id_ingredient_types'})
      ingredient.hasMany(models.inflows, {as: '_current_stock',foreignKey: 'id_ingredient'})
    }
  };
  ingredient.init({
      name: DataTypes.STRING,
      id_unit_measurement: DataTypes.INTEGER,
      id_ingredient_states: DataTypes.INTEGER,
      id_ingredient_types: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER
    },{
      sequelize,
      modelName: 'ingredient',
      underscored: true,
    }
  );
  return ingredient;
};