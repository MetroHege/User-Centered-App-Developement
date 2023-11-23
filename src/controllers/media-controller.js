import { validationResult } from "express-validator";
import {
  addMedia,
  fetchAllMedia,
  fetchMediaById,
  updateMediaById,
  deleteMediaById,
} from "../models/media-model.mjs";

const getItems = async (req, res) => {
  const limit = req.query.limit;
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const getItemsById = async (req, res) => {
  console.log("getItemsById", req.params);
  const result = await fetchMediaById(req.params.id);

  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: "Item not found.", media_id: req.params.id });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const postItem = async (req, res, next) => {
  // console.log("uploaded file", req.file);
  // console.log("uploaded form data", req.body);
  // error handling moved to filefilter
  // if (!req.file) {
  //   const error = new Error("Invalid file upload");
  //   error.status = 400;
  //   return next(error);
  // }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("validation errors", errors.array());
    const error = new Error("Invalid data");
    error.status = 400;
    return next(error);
  }

  if (!errors.isEmpty()) {
    // details about errors are in errors.array()
    console.log(errors.array());
    return res.status(400).json({ message: "Validation failed" });
  }

  const { title, description } = req.body;
  const { filename, mimetype, size } = req.file;
  // req.user is added by authenticateToken middleware
  const user_id = req.user.user_id;
  const newMedia = { title, description, user_id, filename, mimetype, size };
  const result = await addMedia(newMedia);
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201).json({ message: "New media added.", media_id: result });
};

const putItem = async (req, res) => {
  console.log("Item updated", req.params);
  req.body.user_id = req.user.user_id;
  const result = await updateMediaById(req.params.id, req.body);

  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: "Item not found.", media_id: req.params.id });
  }
};

const deleteItem = async (req, res) => {
  console.log("Item deleted", req.params);
  const result = await deleteMediaById(req.params.id);

  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: "Item not found.", media_id: req.params.id });
  }
};

export { getItems, getItemsById, postItem, putItem, deleteItem };
