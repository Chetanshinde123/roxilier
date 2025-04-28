/** @format */

import { DataTypes } from "sequelize";

const User = (sequelize) => {
  const userModel = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          len: [5, 20],
        },
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      address: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "owner"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      timestamps: true,
      tableName: "users",
    }
  );

  userModel.associate = (models) => {
    // userModel has many stores and ratings
    userModel.hasMany(models.Store, {
      foreignKey: "ownerId",
      as: "ownedStores",
    });
    userModel.hasMany(models.Rating, { foreignKey: "userId", as: "ratings" });
  };

  return userModel;
};

export default User;
