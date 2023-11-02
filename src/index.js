import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  getItems,
  getItemsById,
  postItem,
  putItem,
  deleteItem,
} from "./media.js";
import {
  getUsers,
  getUsersById,
  postUser,
  putUser,
  deleteUser,
} from "./users.js";
import { get } from "http";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "../docs")));

// simple custom middleware logging/debugging all requests
app.use((req, res, next) => {
  console.log("Time: ", Date.now(), req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  const values = {
    title: "REST API media",
    message: "Media items gonna be here",
  };
  res.render("home", values);
});

// example generic items api
// get all items
app.get("/api/media", getItems);
// get items by id
app.get("/api/media/:id", getItemsById);
// modify items
app.put("/api/media/:id", putItem);
// create new item
app.post("/api/media", postItem);
// delete item
app.delete("/api/media/:id", deleteItem);

// get all users
app.get("/api/user", getUsers);
// get user by id
app.get("/api/user/:id", getUsersById);
// modify users
app.put("/api/user/:id", putUser);
// create new user
app.post("/api/user", postUser);
// delete user
app.delete("/api/user/:id", deleteUser);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
