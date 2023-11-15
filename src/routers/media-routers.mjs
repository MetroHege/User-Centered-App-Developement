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

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// router specific middleware
// mediaRouter.use(logger);

mediaRouter.route("/").get(getItems).post(upload.single("file"), postItem);

mediaRouter.route("/:id").get(getItemsById).put(putItem).delete(deleteItem);

export default mediaRouter;
