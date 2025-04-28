/** @format */

import Router from "express";
import { createStore, getAllStores } from "../controllers/storeCtrl.js";
import { authMiddleware, isOwner } from "../migrations/authMiddleware.js";

const storeRouter = Router();

storeRouter.post("/add-store", authMiddleware, isOwner, createStore);
storeRouter.get("/all-stores", authMiddleware, isOwner, getAllStores);
export default storeRouter;
