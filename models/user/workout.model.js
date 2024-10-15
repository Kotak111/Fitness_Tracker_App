const { default: mongoose } = require("mongoose");

const workoutLogSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityType: {
      type: String,
      required: true,
      enum: ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Other'],
    },
    duration: {
      type: Number, // duration in minutes
      required: true,
    },
    caloriesBurned: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });
  
  const WorkOut = mongoose.model('WorkoutLog', workoutLogSchema);
  module.exports=WorkOut;
  