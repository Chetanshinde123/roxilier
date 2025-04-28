/** @format */

import User from "../models/User.js";
import Store from "../models/Store.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
// import Rating from "../models/Rating";
// import { dbConfig } from "../config/dbConnect.js";
import db from "../models/index.js";
import { where } from "sequelize";

const UserModel = db.User; // Ensure User is correctly imported from db
const StoreModel = db.Store; // Ensure Store is correctly imported from db
// const RatingModel = db.Rating; // Ensure Rating is correctly imported from db

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({ where: { role: "user" } }); // Fetch all users from the database});

    if (users.length === 0) {
      // Return 204 if no users are found
      return res.status(204).json({ message: "No users found" });
    }

    res.status(200).json(users || []); // Return an empty array if no users are found
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

// @desc     Post a new user
// @route    POST /api/admin/add-user
// @access   Private

export const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existing = await UserModel.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    }).catch((err) => {
      console.error("Error during user creation:", err);
    });
    console.log(user);

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        token: generateToken(user.id),
        data: user,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc     Get all owners
// @route    GET /api/admin/all-owners
// @access   Private

export const getAllOwners = asyncHandler(async (req, res) => {
  try {
    const users = await UserModel.findAll({ where: { role: "owner" } }); // Fetch all users from the database});

    if (users.length === 0) {
      // Return 204 if no users are found
      return res.status(204).json({ message: "No users found" });
    }

    res.status(200).json(users || []); // Return an empty array if no users are found
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

// @desc     Get all stores
// @route    GET /api/admin/all-stores
// @access   Private

export const getAllStores = asyncHandler(async (req, res) => {
  try {
    const stores = await StoreModel.findAll();

    if (stores.length === 0) {
      // Return 204 if no stores are found
      return res.status(204).json({ message: "No stores found" });
    }

    res.status(200).json(stores || []); // Return an empty array if no stores are found
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
