const { default: mongoose } = require("mongoose");

const goalSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    goalType: {
      type: String,
      enum: ['Weekly', 'Monthly'],
      required: true,
    },
    targetValue: {
      type: Number, // e.g., target number of calories, distance, or hours
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['On Track', 'Behind', 'Achieved'],
      default: 'On Track',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  }, { timestamps: true });
  
  const Goal = mongoose.model('Goal', goalSchema);
  module.exports=Goal;
  