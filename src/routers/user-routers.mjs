import express from "express";
import {
  deleteUser,
  getUsers,
  getUsersById,
  postUser,
  putUser,
} from "../controllers/user-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const userRouter = express.Router();

userRouter.route("/").get(getUsers).post(postUser);

userRouter
  .route("/:id")
  .get(getUsersById)
  .put(authenticateToken, putUser)
  .delete(deleteUser);

export default userRouter;
