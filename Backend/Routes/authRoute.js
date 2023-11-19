import express from "express";
import {
  registerController,
  loginController,
} from "../Controller/authController.js";

//Creating Router Object
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
