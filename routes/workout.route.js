const WorkOurController=require("../controller/user/workout.controller");
const { auth, IsUser } = require("../utils/auth");
const router=require("express").Router();
// routes/workout.js

/**
 * @swagger
 * /addwork:
 *   post:
 *     summary: Add a new workout
 *     description: Create a new workout entry for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Workouts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activityType:
 *                 type: string
 *                 description: Type of the activity (e.g., Running, Cycling)
 *               duration:
 *                 type: number
 *                 description: Duration of the workout in minutes
 *               caloriesBurned:
 *                 type: number
 *                 description: Number of calories burned
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the workout
 *     responses:
 *       201:
 *         description: Workout created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/addwork", auth, IsUser, WorkOurController.createWork);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all workouts
 *     description: Retrieve all workouts for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter workouts by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter workouts by end date
 *     responses:
 *       200:
 *         description: List of workouts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", auth, IsUser, WorkOurController.GetAllWorkout);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a workout by ID
 *     description: Retrieve a specific workout entry by its ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/:id", auth, IsUser, WorkOurController.GetByIdWorkout);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a workout by ID
 *     description: Remove a specific workout entry by its ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout deleted successfully
 *       404:
 *         description: Workout not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", auth, IsUser, WorkOurController.DeleteWorkOut);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a workout by ID
 *     description: Update the details of a specific workout entry
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activityType:
 *                 type: string
 *                 description: Type of the activity (e.g., Running, Cycling)
 *               duration:
 *                 type: number
 *                 description: Duration of the workout in minutes
 *               caloriesBurned:
 *                 type: number
 *                 description: Number of calories burned
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the workout
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Workout not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/:id", auth, IsUser, WorkOurController.UpdateWorkOut);

module.exports=router;