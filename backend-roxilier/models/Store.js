/** @format */

import { DataTypes } from "sequelize";

const Store = (sequelize) => {
  const storeModel = sequelize.define(
    "Store",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users", //  should be lowercase and match actual table name
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      tableName: "stores",
    }
  );

  storeModel.associate = (models) => {
    storeModel.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });
    storeModel.hasMany(models.Rating, {
      foreignKey: "storeId",
      as: "ratings",
    });
  };

  return storeModel;
};

export default Store;
