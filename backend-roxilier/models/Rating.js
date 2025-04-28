/** @format */

// /** @format */

// import { DataTypes, Model } from "sequelize";

// class Rating extends Model {}

// export default (sequelize) => {
//   Rating.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       ratingValue: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       tableName: "ratings",
//     }
//   );

//   Rating.associate = (models) => {
//     Rating.belongsTo(models.User, { foreignKey: "userId", as: "user" });
//   };

//   return Rating;
// };

import { DataTypes } from "sequelize";

const Rating = (sequelize) => {
  const ratingModel = sequelize.define(
    "Rating",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      ratingValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5, // Ensures rating is between 1 and 5
        },
      },
    },
    {
      timestamps: true,
      tableName: "ratings",
    }
  );

  ratingModel.associate = (models) => {
    ratingModel.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return ratingModel;
};

export default Rating;
