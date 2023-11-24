import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
} from "../Controller/authController.js";
import { requireSignIn } from "../Middlewares/authMiddleware.js";
//Creating Router Object
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

//Protected Route using Middleware for Admin Portal

router.get("/user-auth", requireSignIn, (req,res)=>{
  res.status(200).send({ok:true});
})
export default router;
