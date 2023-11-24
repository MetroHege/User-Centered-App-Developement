import express from "express";
import {
  deleteUser,
  getUsers,
  getUsersById,
  postUser,
  putUser,
} from "../controllers/user-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
import { body } from "express-validator";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(getUsers)
  .post(
    body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("password").trim().isLength({ min: 8 }),
    body("email").trim().isEmail(),
    postUser
  );

userRouter
  .route("/:id")
  .get(getUsersById)
  .put(
    authenticateToken,
    body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("password").trim().isLength({ min: 8 }),
    body("email").trim().isEmail(),
    putUser
  )
  .delete(deleteUser);

export default userRouter;
