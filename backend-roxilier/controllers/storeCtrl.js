/** @format */

import db from "../models/index.js";
import asyncHandler from "express-async-handler";

// @desc     Get all stores
// @route    GET /api/admin/all-stores
// @access   Private

const StoreModel = db.Store; // Ensure Store is correctly imported from db
const UserModel = db.User; // Ensure User is correctly imported from db

// export const createStore = asyncHandler(async (req, res) => {
//   try {
//     const { name, ownerId } = req.body;

//     // Check if the store already exists
//     const existingStore = await StoreModel.findOne({ where: { name } });
//     if (existingStore) {
//       return res.status(400).json({ message: "Store already exists" });
//     }

//     // Create a new store
//     const user = await UserModel.findAll();
//     if (!user || user.role !== "owner") {
//       return res.status(404).json({
//         status: "failed",
//         message: "Permission denied",
//       });
//     }

//     const store = await StoreModel.create({
//       name,
//       ownerId: user.id,
//     });
//     console.log(store);

//     res.status(201).json(store);
//   } catch (err) {
//     console.error("Error creating store:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// desc     Get all stores
// route    GET /api/admin/all-stores
// access   Private

export const createStore = asyncHandler(async (req, res) => {
  try {
    const { name, email, address, rating = 0, ownerId } = req.body;

    // Check if the store already exists
    const existingStore = await StoreModel.findOne({ where: { name } });
    if (existingStore) {
      return res.status(400).json({ message: "Store already exists" });
    }

    // Find the user by ID
    const user = await UserModel.findByPk(ownerId);
    if (!user || user.role !== "owner") {
      return res.status(403).json({
        status: "failed",
        message: "Permission denied: Only owners can create stores",
      });
    }

    // Create a new store
    const newStore = await db.Store.create({
      name,
      email,
      address,
      rating,
      ownerId: user.id,
    });

    res.status(201).json(newStore);
  } catch (err) {
    console.error("Error creating store:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getAllStores = asyncHandler(async (req, res) => {
  try {
    const stores = await StoreModel.findAll({
      include: [
        {
          model: UserModel,
          as: "owner",
          attributes: ["id", "name", "email", "address", "role"],
        },
      ],
    });

    if (stores.length === 0) {
      // Return 204 if no stores are found
      return res.status(204).json({ message: "No stores found" });
    }

    res.json({
      status: "success",
      message: "Login Success",
      stores,
    }); // Return an empty array if no stores are found
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
