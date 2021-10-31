'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ingredient_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ingredient_types.belongsTo(models.user,{as: '_created_by',foreignKey: 'created_by'})
      ingredient_types.belongsTo(models.user,{as: '_updated_by',foreignKey: 'updated_by'})
      ingredient_types.hasMany(models.ingredient, {as: '_ingredients',foreignKey: 'id_ingredient_types'})
    }
  };
  ingredient_types.init({
      name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER
    },{
      sequelize,
      modelName: 'ingredient_types',
      underscored: true,
    }
  );
  return ingredient_types;
};