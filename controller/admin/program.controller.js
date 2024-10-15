
const Program = require("../../models/admin/fitenessProgram.model");
const Goal = require("../../models/user/gols.model");
const User = require("../../models/user/user.model");
const WorkOut = require("../../models/user/workout.model");

//create Program
exports.CreateProgram = async (req, res) => {
  try {
    const goal = new Program({
      ...req.body,
      createdBy:req.user.id
    });
    await goal.save();
    res.status(201).json({
      success: true,
      message: "Program Created"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Inrenal server error"
    });
  }
}

//get All program
exports.getAllProgram = async (req, res) => {
  try {
    const find = await Program.find().populate("createdBy").exec();
    if (find) {
      res.status(200).json({
        success: true,
        Program: find
      })
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Inrenal server error"
    });
  }
}

// Admin: Get all users
exports.GetAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Admin: Delete a user

exports.DeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


// Get workout statistics

exports.GetAggrigate = async (req, res) => {
  const { startDate, endDate, activityType, goalStatus } = req.query;
  try {

    const workoutMatch = { user: req.user.id };
    
    
    if (startDate && endDate) {
      workoutMatch.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (activityType) {
      workoutMatch.activityType = activityType;
    }

    

    // Filter criteria for Goal
    const goalMatch = { user: req.user.id };
    if (goalStatus) {
      goalMatch.status = goalStatus;
    }

    const workoutStats = await WorkOut.aggregate([
      { $match: workoutMatch },
      {
        $group: {
          _id: '$activityType',
          totalDuration: { $sum: '$duration' },
          totalCalories: { $sum: '$caloriesBurned' },
          averageCalories: { $avg: '$caloriesBurned' },
          count: { $sum: 1 },
        },
      },
    ]);
    
    console.log('Workout Stats filtered by activity type:', workoutStats);
    

    // Aggregate goal statistics
    const goalStats = await Goal.aggregate([
      {
        $group: {
          _id: '$status',
          totalGoals: { $sum: 1 },
          achievedGoals: { $sum: { $cond: [{ $eq: ['$status', 'Achieved'] }, 1, 0] } },
          onTrackGoals: { $sum: { $cond: [{ $eq: ['$status', 'On Track'] }, 1, 0] } },
          behindGoals: { $sum: { $cond: [{ $eq: ['$status', 'Behind'] }, 1, 0] } },
        },
      },
    ]);
    
   
    
    res.json({ workoutStats, goalStats });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
