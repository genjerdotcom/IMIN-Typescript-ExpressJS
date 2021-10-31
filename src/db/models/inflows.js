'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class inflows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      inflows.belongsTo(models.user,{as: '_created_by',foreignKey: 'created_by'})
      inflows.belongsTo(models.user,{as: '_updated_by',foreignKey: 'updated_by'})
      inflows.belongsTo(models.ingredient, {as: '_ingredient',foreignKey: 'id_ingredient'})
    }
  };
  inflows.init({
      id_ingredient: DataTypes.INTEGER,
      reason: DataTypes.ENUM('Purchase', 'Recount'),
      price: DataTypes.NUMERIC,
      qty: DataTypes.NUMERIC,
      additional_details: DataTypes.TEXT,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'inflows',
      underscored: true,
    }
  );
  return inflows;
};