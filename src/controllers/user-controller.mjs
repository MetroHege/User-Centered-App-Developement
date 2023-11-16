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
  console.log("Created user", req.body);
  console.log("", req.body);
  const { username, email, password } = req.body;
  const { user_id, user_level_id } = req.params;
  if (username && email && password) {
    const newUser = { username, email, password, user_id, user_level_id };
    const result = await addUser(newUser);
    res.status(201);
    res.json({ message: "New user added.", ...result });
  } else {
    res.sendStatus(400);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const putUser = async (req, res) => {
  const result = await updateUserById(req.params.id, req.body);
  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.sendStatus(404);
    res.json({ error: "User not found.", user_id: req.params.id });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const deleteUser = async (req, res) => {
  console.log("User deleted", req.params);
  const result = await deleteUser("User deleted", req.params.id);
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
