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

/**
 * @api {get} media/ Get All Media
 * @apiGroup Media
 * @apiDescription Returns a list of all media items.
 * @apiName GetAllMedia
 *
 * @apiSuccess {Object[]} data List of media items.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    [
  {
    "media_id": 1,
    "user_id": 2,
    "filename": "nosefbsuie.jpg",
    "filesize": 123456,
    "media_type": "1",
    "title": "Nice sunshine",
    "description": "A nice picture of the sun",
    "created_at": "2023-11-16T07:17:56.000Z"
  },
  {
    "media_id": 2,
    "user_id": 2,
    "filename": "sample.mp4",
    "filesize": 20480,
    "media_type": "video/mp4",
    "title": "Sample Video",
    "description": "A sample video file",
    "created_at": "2023-11-16T07:17:56.000Z"
  }
]
 */

/**
 * @api {get} media/:id Get Media by ID
 * @apiGroup Media
 * @apiDescription Returns a specific media item by its ID.
 * @apiName GetMediaByID
 *
 * @apiParam {String} id Unique identifier of the media item.
 *
 * @apiSuccess {Object} data Specific media item.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
  "media_id": 1,
  "user_id": 2,
  "filename": "updated-sunshine.jpg",
  "filesize": 123456,
  "media_type": "1",
  "title": "updated sunshine",
  "description": "updated A nice picture of the sun",
  "created_at": "2023-11-16T07:17:56.000Z"
}
 *
 * @apiError 404 Item not found.
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": "Item not found."
 *    }
 */

/**
 * @api {post} media/ Add New Media
 * @apiGroup Media
 * @apiDescription Adds a new media item.
 * @apiName AddNewMedia
 *
 * @apiParam {String} title Title of the media (minimum length: 3 characters).
 * @apiParam {String} description Description of the media (maximum length: 255 characters).
 * @apiParam {File} file Media file to upload.
 *
 * @apiSuccess {String} message Message confirming the addition.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "New media added."
 *    }
 *
 * @apiError 400 Bad Request if validation fails.
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Invalid data."
 *    }
 */

// Similarly, add documentation for other endpoints (PUT and DELETE)

/**
 * @api {put} media/:id Update Media
 * @apiGroup Media
 * @apiDescription Updates a specific media item by its ID.
 * @apiName UpdateMedia
 *
 * @apiParam {String} id Unique identifier of the media item.
 * @apiParam {String} title Title of the media (minimum length: 3 characters).
 * @apiParam {String} description Description of the media (maximum length: 255 characters).
 *
 * @apiSuccess {String} message Message confirming the update.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Media updated."
 *    }
 *
 * @apiError 400 Bad Request if validation fails.
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Invalid data."
 *    }
 * @apiError 404 Item not found.
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": "Item not found."
 *    }
 */

/**
 * @api {delete} media/:id Delete Media
 * @apiGroup Media
 * @apiDescription Deletes a specific media item by its ID.
 * @apiName DeleteMedia
 *
 * @apiParam {String} id Unique identifier of the media item.
 *
 * @apiSuccess {String} message Message confirming the deletion.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Media deleted."
 *    }
 *
 * @apiError 404 Item not found.
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": "Item not found."
 *    }
 */

/**
 * @apiDefine ValidationRules
 * @apiDescription Defines the validation rules for request parameters.
 *
 * @apiParam {String} title Must be at least 3 characters long.
 * @apiParam {String} description Must be at most 255 characters long.
 */

/**
 * @apiDefine Authentication
 * @apiDescription Authentication required for certain endpoints using `authenticateToken` middleware.
 */

/**
 * @apiDefine ErrorHandling
 * @apiDescription Describes the possible error responses.
 *
 * @apiError 400 Bad Request: Invalid data or validation failure.
 * @apiError 404 Not Found: Item not found.
 * @apiError 500 Internal Server Error: Server error occurred.
 */

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
