/** @format */

import { Router } from "express";
import { loginUserCtrl, registerCtrl } from "../controllers/authCrtl.js";

const router = Router();

router.post("/signup", registerCtrl);
router.post("/login", loginUserCtrl);

export default router;
