const GoalController=require("../controller/user/goal.controller");
const { auth, IsUser } = require("../utils/auth");
const router=require("express").Router();
// routes/goal.js

/**
 * @swagger
 * /addgoal:
 *   post:
 *     summary: Add a new goal
 *     description: Create a new goal entry for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Goals
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the goal
 *               description:
 *                 type: string
 *                 description: Description of the goal
 *               status:
 *                 type: string
 *                 enum: [Achieved, On Track, Behind]
 *                 description: Current status of the goal
 *               targetDate:
 *                 type: string
 *                 format: date
 *                 description: Target date for achieving the goal
 *     responses:
 *       201:
 *         description: Goal created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/addgoal", auth, IsUser, GoalController.CreateGoals);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all goals
 *     description: Retrieve all goals for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Goals
 *     responses:
 *       200:
 *         description: List of goals retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", auth, IsUser, GoalController.GetAllGoals);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a goal by ID
 *     description: Remove a specific goal entry by its ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Goals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *       404:
 *         description: Goal not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", auth, IsUser, GoalController.DeleteGolas);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a goal by ID
 *     description: Update the details of a specific goal entry
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Goals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the goal
 *               description:
 *                 type: string
 *                 description: Description of the goal
 *               status:
 *                 type: string
 *                 enum: [Achieved, On Track, Behind]
 *                 description: Current status of the goal
 *               targetDate:
 *                 type: string
 *                 format: date
 *                 description: Target date for achieving the goal
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Goal not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put("/:id", auth, IsUser, GoalController.UpdateGoals);

module.exports=router;