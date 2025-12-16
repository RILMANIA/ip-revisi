"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Build extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Build.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Build.init(
    {
      UserId: DataTypes.INTEGER,
      character_name: DataTypes.STRING,
      weapon: DataTypes.STRING,
      artifact: DataTypes.STRING,
      notes: DataTypes.STRING,
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Build",
    }
  );
  return Build;
};
