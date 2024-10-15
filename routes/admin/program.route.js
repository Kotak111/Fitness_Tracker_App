const { IsAdmin } = require("../../utils/auth");
const ProgramController=require("../../controller/admin/program.controller.js");
const { auth} = require("../../utils/auth");
const router=require("express").Router();
// routes/program.js

/**
 * @swagger
 * /addprogram:
 *   post:
 *     summary: Add a new fitness program
 *     description: Create a new fitness program entry by an admin
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Programs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the fitness program
 *               description:
 *                 type: string
 *                 description: Description of the fitness program
 *               activities:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     activityType:
 *                       type: string
 *                       enum: [Running, Cycling, Swimming, Weightlifting, Yoga, Other]
 *                       description: Type of activity included in the program
 *                     duration:
 *                       type: number
 *                       description: Duration of the activity in minutes
 *     responses:
 *       201:
 *         description: Program created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin required)
 *       500:
 *         description: Internal server error
 */
router.post("/addprogram", auth, IsAdmin, ProgramController.CreateProgram);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all fitness programs
 *     description: Retrieve all fitness programs available to users
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Programs
 *     responses:
 *       200:
 *         description: List of fitness programs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FitnessProgram'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin required)
 *       500:
 *         description: Internal server error
 */
router.get("/", auth, IsAdmin, ProgramController.getAllProgram);

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users in the system (Admin only)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin required)
 *       500:
 *         description: Internal server error
 */
router.get("/admin", auth, IsAdmin, ProgramController.GetAllUser);

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Remove a specific user by their ID (Admin only)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin required)
 *       500:
 *         description: Internal server error
 */
router.delete("/admin/:id", auth, IsAdmin, ProgramController.DeleteUser);

/**
 * @swagger
 * /aggtigate:
 *   get:
 *     summary: Get aggregate statistics
 *     description: Retrieve aggregate statistics related to fitness programs
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Programs
 *     responses:
 *       200:
 *         description: Aggregate statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPrograms:
 *                   type: number
 *                   description: Total number of fitness programs
 *                 totalUsers:
 *                   type: number
 *                   description: Total number of users
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/aggtigate", auth, ProgramController.GetAggrigate);

module.exports=router;