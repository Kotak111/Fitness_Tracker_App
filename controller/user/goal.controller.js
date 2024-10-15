const Goal = require("../../models/user/gols.model");

// create gols 
exports.CreateGoals= async (req,res)=>{
    try {
        const goal = new Goal({
          ...req.body,
          user: req.user.id,
        });
        await goal.save();
        res.status(201).json({
            success:true,
            message:"Goal Created"
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Inrenal server error"
        });
      }
}
exports.GetAllGoals=async(req,res)=>{
    try {
        const find= await Goal.find().populate("user").exec()
        if(find){
            res.status(200).json({
                success:true,
                Goals:find
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Inrenal server error"
        });
    }
}

//delete goals 
exports.DeleteGolas=async(req,res)=>{
   try {
     const find=await Goal.findByIdAndDelete(req.params.id);
     if(find){
         res.status(200).json({
             success:true,
             message:"Goals Are Deleted"
         })
     }
   } catch (error) {
     console.log(error);
        res.status(500).json({
            success:false,
            message:"Inrenal server error"
        });
   }
}

//update goals
exports.UpdateGoals= async(req,res)=>{
    try {
        const find=await Goal.findByIdAndUpdate(req.params.id,req.body, {new:true})
        if(find){
            res.status(200).json({
                success:true,
              message:"Goals updated"
            })
        }
      } catch (error) {
       res.status(500).json({
           success:false,
           message:"Internal server error"
       })
      }
}