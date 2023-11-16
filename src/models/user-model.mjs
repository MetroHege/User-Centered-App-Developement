import { promisePool } from "../utils/database.mjs";

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

const addUser = async (user) => {
  const { username, email, password } = user;
  const sql = `INSERT INTO users (username, email, password)
                     VALUES (?, ?, ?)`;
  const params = [username, email, password];
  try {
    const result = await promisePool.query(sql, params);
    console.log("rows", result);
    return { user_id: result[0].insertId };
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
    return { user_id: result[0].insertId };
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
    return { user_id: result[0].insertId };
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
};
