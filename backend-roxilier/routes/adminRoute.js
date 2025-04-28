/** @format */

import { Router } from "express";
import {
  createUser,
  getAllOwners,
  getAllStores,
  getAllUsers,
} from "../controllers/adminCtrl.js";
import { authMiddleware, isAdmin } from "../migrations/authMiddleware.js";

const adminRouter = Router();

adminRouter.get("/all-users", authMiddleware, isAdmin, getAllUsers);
adminRouter.post("/add-user", authMiddleware, isAdmin, createUser);
adminRouter.get("/all-owners", authMiddleware, isAdmin, getAllOwners);
adminRouter.get("/all-stores", authMiddleware, isAdmin, getAllStores);

export default adminRouter;
