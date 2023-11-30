import express from "express";
import {
  deleteUser,
  getUsers,
  getUsersById,
  postUser,
  putUser,
} from "../controllers/user-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
import { body } from "express-validator";

const userRouter = express.Router();

/**
 * @api {get} users/ Get All Users
 * @apiGroup Users
 * @apiDescription Retrieves a list of all users.
 * @apiName GetAllUsers
 *
 * @apiSuccess {Object[]} data List of user items.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 * {
    "user_id": 2,
    "username": "JaneSmith",
    "password": "Secret_-_Passw0Rd",
    "email": "jane.smith@example.com",
    "user_level_id": 2,
    "created_at": "2023-11-16T07:17:56.000Z"
  },
  {
    "user_id": 3,
    "username": "Anon5468",
    "password": "to-be-hashed-pw3",
    "email": "anon5468@example.com",
    "user_level_id": 2,
    "created_at": "2023-11-16T07:17:56.000Z"
  },
  {
    "user_id": 4,
    "username": "AdminUser",
    "password": "to-be-hashed-pw4",
    "email": "adminuser@example.com",
    "user_level_id": 1,
    "created_at": "2023-11-16T07:17:56.000Z"
  }
 * ]
 */

/**
 * @api {get} users/:id Get User by ID
 * @apiGroup Users
 * @apiDescription Retrieves a specific user by their ID.
 * @apiName GetUserByID
 *
 * @apiParam {String} id Unique identifier of the user.
 *
 * @apiSuccess {Object} data Specific user item.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
  "user_id": 9,
  "username": "Toimiiko",
  "password": "********",
  "email": "toimiihan@pliis.com",
  "user_level_id": 1,
  "created_at": "2023-11-21T17:53:00.000Z"
}
 *
 * @apiError 404 User not found.
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 Not Found
 *    {
 *      "error": "User not found."
 *    }
 */

/**
 * @api {post} users/ Add New User
 * @apiGroup Users
 * @apiDescription Adds a new user.
 * @apiName AddNewUser
 *
 * @apiParam {String} username User's username (3-20 alphanumeric characters).
 * @apiParam {String} password User's password (minimum length: 8 characters).
 * @apiParam {String} email User's email in valid email format.
 *
 * @apiSuccess {String} message Message confirming the addition.
 * @apiSuccess {String} user_id Unique identifier of the new user.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "New user added.",
 *      "user_id": "12"
 *    }
 *
 * @apiError 400 Bad Request if validation fails.
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Validation failed."
 *    }
 */

/**
 * @api {put} users/:id Update User
 * @apiGroup Users
 * @apiDescription Updates an existing user by their ID.
 * @apiName UpdateUser
 *
 * @apiParam {String} id Unique identifier of the user.
 * @apiParam {String} username User's username (3-20 alphanumeric characters).
 * @apiParam {String} password User's password (minimum length: 8 characters).
 * @apiParam {String} email User's email in valid email format.
 *
 * @apiSuccess {String} message Message confirming the update.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "User updated."
 *    }
 *
 * @apiError 400 Bad Request if validation fails.
 * @apiError 404 Not Found if the user does not exist.
 */

/**
 * @api {delete} users/:id Delete User
 * @apiGroup Users
 * @apiDescription Deletes a specific user by their ID.
 * @apiName DeleteUser
 *
 * @apiParam {String} id Unique identifier of the user.
 *
 * @apiSuccess {String} message Message confirming the deletion.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "User deleted."
 *    }
 *
 * @apiError 404 Not Found if the user does not exist.
 */

// Definitions (ValidationRules, Authentication, ErrorHandling) remain the same as before

userRouter
  .route("/")
  .get(getUsers)
  .post(
    body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("password").trim().isLength({ min: 8 }),
    body("email").trim().isEmail(),
    postUser
  );

userRouter
  .route("/:id")
  .get(getUsersById)
  .put(
    authenticateToken,
    body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("password").trim().isLength({ min: 8 }),
    body("email").trim().isEmail(),
    putUser
  )
  .delete(deleteUser);

export default userRouter;
