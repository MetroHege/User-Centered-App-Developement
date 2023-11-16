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

const postItem = async (req, res) => {
  console.log("uploaded file", req.file);
  console.log("uploaded form data", req.body);
  const { title, description, user_id } = req.body;
  const { filename, mimetype, size } = req.file;
  if (filename && title && user_id) {
    const newMedia = { title, description, user_id, filename, mimetype, size };
    const result = await addMedia(newMedia);
    res.status(201);
    res.json({ message: "New media item added.", ...result });
  } else {
    res.sendStatus(400);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const putItem = async (req, res) => {
  console.log("Item updated", req.params);
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
