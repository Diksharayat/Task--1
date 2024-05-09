const express = require("express");
const {
  registerUserController,
  loginUserController,
  profileUserController,
  deleteUserController,
  updateUserController,
  authenticateToken,
  verifyOTPController,
  sendEmail,
} = require("../../controllers/users/usersCtrl");

const usersRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Authentication
 *   description: API endpoints related to user authentication
 */

//POST/users/register

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with the provided username, email, password, and role.
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request or passwords do not match
 *       500:
 *         description: Registration failed due to server error
 */
usersRoute.post("/register", registerUserController);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in user
 *     description: Logs in a user with the provided email and password.
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials provided
 *       500:
 *         description: Login failed due to server error
 *
 */

/**
 * @swagger
 * /users/verify-otp:
 *   post:
 *     summary: verify the otp
 *     description: verify the otp, sent on the user email id.
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              otp:
 *                type: string
 *     responses:
 *       200:
 *         description: Otp verified successfully
 *       401:
 *         description: Invalid Otp provided
 *       500:
 *         description: Otp verification failed due to server error
 *
 *
 */

// POST/users/login
usersRoute.post("/login", loginUserController);

// usersRoute.post("/otp", loginUserAndSendOTP);
usersRoute.post("/verify-otp", verifyOTPController);

usersRoute.get("/admin-dashboard", authenticateToken);

usersRoute.post("/forget-password", sendEmail);



//GET/users/profile/:id

usersRoute.get("/profile/:id", profileUserController);

// DELETE/api/v1/users/:id
usersRoute.delete("/:id", deleteUserController);

// PUT/api/v1/users/:id
usersRoute.put("/:id", updateUserController);

module.exports = usersRoute;
