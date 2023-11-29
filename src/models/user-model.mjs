import { promisePool } from "../utils/database.mjs";

/**
 * fetch user from database based on username and password pair
 *
 * @param {object} userCreds - contains username and password properties
 * @returns
 */
const login = async (username) => {
  try {
    const sql = "SELECT * FROM users WHERE username = ?";
    const params = [username];
    const result = await promisePool.query(sql, params);
    const [rows] = result;
    console.log("login, user found?", rows[0]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchAllUsers = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM users");
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchUserById = async (id) => {
  try {
    const sql = "SELECT * FROM users WHERE user_id=?";
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log("rows", rows);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

/**
 * Creates a new user in the database
 *
 * @param {object} user data
 * @returns {number} - id of the inserted user in db
 */

const addUser = async (user) => {
  try {
    const sql = `INSERT INTO Users (username, email, password, user_level_id)
                VALUES (?, ?, ?, ?)`;
    // user level id defaults to 2 (normal user)
    const params = [user.username, user.email, user.password, 2];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const updateUserById = async (id, user) => {
  const { username, email, password } = user;
  const sql = `UPDATE users SET username=?, email=?, password=? WHERE user_id=?`;
  const params = [username, email, password, id];
  try {
    const result = await promisePool.query(sql, params);
    console.log("rows", result);
    return { message: "User updated" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const deleteUserById = async (id) => {
  const sql = `DELETE FROM users WHERE user_id=?`;
  const params = [id];
  try {
    const result = await promisePool.query(sql, params);
    console.log("rows", result);
    return { message: "User deleted" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export {
  fetchAllUsers,
  fetchUserById,
  addUser,
  updateUserById,
  deleteUserById,
  login,
};
