import express from "express";
import multer from "multer";
import {
  deleteItem,
  getItems,
  getItemsById,
  postItem,
  putItem,
} from "../controllers/media-controller.js";
import logger from "../middlewares/middlewares.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// router specific middleware
// mediaRouter.use(logger);

// TODO: check and add authentication where needed
mediaRouter
  .route("/")
  .get(getItems)
  .post(authenticateToken, upload.single("file"), postItem);

mediaRouter
  .route("/:id")
  .get(getItemsById)
  .put(authenticateToken, putItem)
  .delete(authenticateToken, deleteItem);

export default mediaRouter;
