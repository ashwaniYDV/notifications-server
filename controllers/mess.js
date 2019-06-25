const Mess=require('../models/mess');

module.exports={

    //get all mess api (access: auth users)
    getAllMess: async(req,res,next)=>{
        const mess=await Mess.find({})
        if(mess){
            res.status(200).json({
                mess: mess
            })
        } else {
            res.status(404).json({
                message: "No mess data found"
            })
        }
    },

    //post a feed api (access: auth users)
    postMess: async(req,res,next)=>{
        //create a new feed
        const mess=new Mess(req.value.body);
        await mess.save();
        //response
        res.status(200).json({
            mess: mess
        })
    },

    //get feed with feedId api (access: auth users)
    getMessWithStudentMongoId: async(req,res,next)=>{
        const studentMongoId=req.params.studentMongoId;
        const mess=await Mess.findOne({studentMongoId: studentMongoId})
        if(mess){
            res.status(200).json({
                mess: mess
            })
        } else {
            res.status(404).json({
                message: "No mess data found"
            })
        }
    },

    //delete feed using feedId if instituteId of auth user=feedPoster   api (access: feedPoster, superUser)
    deleteMessWithStudentMongoId: async(req,res,next)=>{
        const studentMongoId=req.params.studentMongoId;

        const mess=await Mess.findOne({studentMongoId: studentMongoId})
        if(mess){
            await Mess.findByIdAndRemove({_id: mess._id});
            res.status(200).json({
                message: "Mess data deleted" 
            });
            
        } else {
            res.status(404).json({
                message: "No mess data found"
            })
        }
    },

    //update(patch) feed with feedId api (access: feedPoster, superUer)
    patchMessWithStudentMongoId: async(req,res,next)=>{
        const studentMongoId=req.params.studentMongoId;
        const time=new Date().getTime();

        const mess=await Mess.findOne({studentMongoId: studentMongoId})
        if(mess){
            Mess.findByIdAndUpdate({_id: mess._id},req.value.body,{new:true}).then((updatedMess)=>{
                res.status(200).json({
                    updatedMess: updatedMess
                });
            });
        } else {
            res.status(404).json({
                message: "No mess data found"
            })
        }  
    },
    
}