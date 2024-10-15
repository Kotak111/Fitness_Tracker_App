const { default: mongoose } = require("mongoose");

const fitnessProgramSchema = new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    activities: [
      {
        activityType: {
          type: String,
          enum: ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Other'],
          required: true,
        },
        duration: {
          type: Number, // duration in minutes
          required: true,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }, { timestamps: true });
  
  const Program=  mongoose.model('FitnessProgram', fitnessProgramSchema);
  module.exports=Program;
  