import { validationResult } from "express-validator";
import {
  fetchAllUsers,
  fetchUserById,
  addUser,
  updateUserById,
  deleteUserById,
} from "../models/user-model.mjs";

/**
 *
 * @param {*} req
 * @param {*} res
 */

const getUsers = async (req, res) => {
  const limit = req.query.limit;
  const userItems = await fetchAllUsers();
  res.json(userItems);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const getUsersById = async (req, res) => {
  console.log("getUsersById", req.params);
  const result = await fetchUserById(req.params.id);

  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: "User not found.", user_id: req.params.id });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors are in errors.array()
    console.log(errors.array());
    return res.status(400).json({ message: "Validation failed" });
  }
  const newUserId = await addUser(req.body);
  res.status(201).json({ message: "New user added.", user_id: newUserId });
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const putUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors are in errors.array()
    console.log(errors.array());
    return res.status(400).json({ message: "Validation failed" });
  }
  const result = await updateUserById(req.params.id, req.body);
  // if (result) {
  //   if (result.error) {
  //     res.status(500);
  //   }
  //   res.json(result);
  // } else {
  //   res.sendStatus(404);
  //   res.json({ error: "User not found.", user_id: req.params.id });
  // }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const deleteUser = async (req, res) => {
  console.log("User deleted", req.params);
  const result = await deleteUserById("User deleted", req.params.id);
  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: "User not found.", user_id: req.params.id });
  }
};

export { getUsers, getUsersById, postUser, putUser, deleteUser };
