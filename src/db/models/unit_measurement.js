'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class unit_measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      unit_measurement.belongsTo(models.user,{as: '_created_by',foreignKey: 'created_by'})
      unit_measurement.belongsTo(models.user,{as: '_updated_by',foreignKey: 'updated_by'})
    }
  };
  unit_measurement.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      abreviation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      precision: DataTypes.DECIMAL,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER
    },{
      sequelize,
      modelName: 'unit_measurement',
      underscored: true,
    }
  );
  return unit_measurement;
};