const WorkOut = require("../../models/user/workout.model");

//create workout 
exports.createWork= async (req,res)=>{
    try {
        const {activityType , duration , caloriesBurned , date}=req.body;
    
        const work= new WorkOut({
            activityType,
            duration,
            caloriesBurned,
            date,
            user: req.user._id
            
    })
        await work.save();
    
          if(work){
                return res.status(200).json({
                    success:true,
                    message:"Workout Created"
                })
          }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

//get All Workout
exports.GetAllWorkout= async (req,res)=>{
   try {
     const find=await WorkOut.find().populate("user").exec()
     if(find){
         res.status(200).json({
             success:true,
             Workout:find
         })
     }
   } catch (error) {
    res.status(500).json({
        success:false,
        message:"Internal server error"
    })
   }
}

//get By Id workout 
exports.GetByIdWorkout= async (req,res)=>{
    try {
      const find=await WorkOut.findById(req.params.id).populate("user").exec()
      if(find){
          res.status(200).json({
              success:true,
              Workout:find
          })
      }
    } catch (error) {
     res.status(500).json({
         success:false,
         message:"Internal server error"
     })
    }
 }

 //delete workout
 exports.DeleteWorkOut = async (req,res)=>{
    try {
        const find=await WorkOut.findByIdAndDelete(req.params.id)
        if(find){
            res.status(200).json({
                success:true,
              message:"WorkOut deleted"
            })
        }
      } catch (error) {
        console.log(error);
        
       res.status(500).json({
           success:false,
           message:"Internal server error"
       })
      }
 }

 //update workout
 exports.UpdateWorkOut=async(req,res)=>{
    try {
        const find=await WorkOut.findByIdAndUpdate(req.params.id,req.body, {new:true})
        if(find){
            res.status(200).json({
                success:true,
              message:"WorkOut updated"
            })
        }
      } catch (error) {
        console.log(error);
        
       res.status(500).json({
           success:false,
           message:"Internal server error"
       })
      }
 }
