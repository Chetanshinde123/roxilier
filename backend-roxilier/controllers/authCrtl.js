/** @format */

// backend/controllers/auth.controller.js
// const bcrypt = require("bcryptjs");
// const generateToken = require("../utils/generateToken");
// const db = require("../models");
// const User = db.User;

import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import db from "../models/index.js";
import { where } from "sequelize";
// import User from "../models/User.js"; // Adjust the import path as necessary

const User = db.User; // Ensure User is correctly imported from your models

export const registerCtrl = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
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
};

export const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;

  // Find user in db by email
  const userFound = await User.findOne({ where: { email } });
  if (!userFound) return res.status(404).json({ message: "User not found" });

  // If only data provided data
  if (!email || !password) {
    return res.json({
      status: "failed",
      message: "Please provide both email and password",
    });
  }

  // Check if password is correct
  const ismatch = await bcrypt.compare(password, userFound?.password);

  if (userFound && ismatch) {
    // Generate both access token and refresh token
    const accessToken = generateToken(userFound);
    // const refreshToken = generateRefreshToken(userFound._id);
    res.json({
      status: "success",
      message: "Login Success",
      userFound,
      token: accessToken,
    });
    console.log("Token generated successfully:", accessToken);
  } else {
    throw new Error("Invaild login details");
  }
};
