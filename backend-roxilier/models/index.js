/** @format */

// /** @format */

// import { Sequelize } from "sequelize";
// import { dbConfig } from "../config/dbConnect.js";
// import User from "./User.js";

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: "mysql",
// });

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// // import Store from "./Store.js";
// // import Rating from "./R";

// db.User = User(sequelize, Sequelize);
// // db.Store = Store(sequelize, Sequelize);
// // db.Rating = Rating(sequelize, Sequelize);

// // Associations
// Object.values(db).forEach((model) => {
//   if (model.associate) {
//     model.associate(db);
//   }
// });

// // Sync all models with the database

// export default db;

/** @format */

import { Sequelize } from "sequelize";
import { dbConfig } from "../config/dbConnect.js";
import User from "./User.js";
import Store from "./Store.js"; // Ensure Store is correctly imported
import Rating from "./Rating.js"; // Ensure Rating is correctly imported

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.User = User(sequelize); // Pass the sequelize instance correctly
db.Store = Store(sequelize); // Initialize Store model
db.Rating = Rating(sequelize); // Initialize Rating model

// Associations
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

// Database connection (assuming you have a dbConnect.js file for this)
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });

export default db;
