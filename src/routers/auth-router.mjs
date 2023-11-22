import express from "express";
import { postLogin } from "../controllers/auth-controller.mjs";

const authRouter = express.Router();

// routes for /api/auth
authRouter.route("/login").post(postLogin);

export default authRouter;
