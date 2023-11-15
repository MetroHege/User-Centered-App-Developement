import express from "express";
import {
  deleteUser,
  getUsers,
  getUsersById,
  postUser,
  putUser,
} from "../controllers/user-controller.mjs";

const userRouter = express.Router();

userRouter.route("/").get(getUsers).post(postUser);

userRouter.route("/:id").get(getUsersById).put(putUser).delete(deleteUser);

export default userRouter;
