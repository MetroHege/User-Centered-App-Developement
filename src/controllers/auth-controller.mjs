import jwt from "jsonwebtoken";
import "dotenv/config";
import { login } from "../models/user-model.mjs";
import bcrypt from "bcryptjs";

const postLogin = async (req, res, next) => {
  // TODO: use model to query sql for user info
  const user = await login(req.body.username);
  // user is undefined if no user found in database
  if (!user) {
    const error = new Error("Username not found");
    error.status = 401;
    return next(error);
  }
  // database error in model
  if (user.error) {
    return next(new Error("Database error: "));
  }
  console.log("postLogin", user);
  const match = bcrypt.compareSync(req.body.password, user.password);
  if (match) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ message: "Logged in", token, user });
  } else {
    const error = new Error("Invalid password");
    error.status = 401;
    return next(error);
  }
};

const getMe = async (req, res) => {
  console.log("getMe user", req.user);
  res.json(req.user);
};

export { postLogin, getMe };
