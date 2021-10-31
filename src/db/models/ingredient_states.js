'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ingredient_states extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ingredient_states.belongsTo(models.user,{as: '_created_by',foreignKey: 'created_by'})
      ingredient_states.belongsTo(models.user,{as: '_updated_by',foreignKey: 'updated_by'})
      ingredient_states.hasMany(models.ingredient, {as: '_ingredients',foreignKey: 'id_ingredient_states'})
    }
  };
  ingredient_states.init({
      name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'ingredient_states',
      underscored: true,
    }
  );
  return ingredient_states;
};