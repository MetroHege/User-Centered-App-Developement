import express from "express";
import {
  deleteItem,
  getItems,
  getItemsById,
  postItem,
  putItem,
} from "../controllers/media-controller.js";
import { authenticateToken } from "../middlewares/authentication.mjs";
import { body } from "express-validator";
import upload from "../middlewares/upload.mjs";

const mediaRouter = express.Router();

// router specific middleware
// mediaRouter.use(logger);

// TODO: check and add authentication where needed
mediaRouter
  .route("/")
  .get(getItems)
  .post(
    authenticateToken,
    upload.single("file"),

    // TODO: add missing validation rules
    body("title").trim().isLength({ min: 3 }),
    body("description").isLength({ max: 255 }),
    postItem
  );

mediaRouter
  .route("/:id")
  .get(getItemsById)
  .put(
    authenticateToken,
    body("title").trim().isLength({ min: 3 }),
    putItem,
    body("description").isLength({ max: 255 }),
    putItem
  )
  .delete(authenticateToken, deleteItem);

export default mediaRouter;
