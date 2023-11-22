import express from "express";
import { getMe, postLogin } from "../controllers/auth-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const authRouter = express.Router();

// routes for /api/auth
authRouter.route("/login").post(postLogin);
authRouter.route("/me").get(authenticateToken, getMe);
// authRouter.route("/media/:id").put().delete();

export default authRouter;
