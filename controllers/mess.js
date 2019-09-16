const Mess=require('../models/mess');

module.exports={

    //get all mess api (access: )
    getAllMess: async(req,res,next)=>{
        const mess=await Mess.find({}).populate('student','name instituteId');
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

    //post (access: )
    postMess: async(req,res,next)=>{
        if(req.user.id !== req.value.body.student){
            return res.status(401).json({
                message: "Unauthorized request"
            })
        }
        const result=await Mess.findOne({student: req.value.body.student});
        if(result){
            res.status(422).json({
                "message": "Student mess data already exists"
            })
        } else {
            //create a new mess
            const mess=new Mess(req.value.body);
            await mess.save();
            //response
            res.status(200).json({
                mess: mess
            })
        }
    },

    //get (access: )
    getMessWithStudentMongoId: async(req,res,next)=>{
        const studentMongoId=req.params.studentMongoId;
        let mess=await Mess.findOne({student: studentMongoId}).populate('student','name instituteId');
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

    //delete api (access: )
    deleteMessWithStudentMongoId: async(req,res,next)=>{
        const studentMongoId=req.params.studentMongoId;
        if(req.user.id !== studentMongoId){
            return res.status(401).json({
                message: "Unauthorized request"
            })
        }

        const mess=await Mess.findOne({student: studentMongoId})
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

    //update(patch) (access: )
    patchMessWithStudentMongoId: async(req,res,next)=>{
        const studentMongoId=req.params.studentMongoId;
        if(req.user.id !== studentMongoId){
            return res.status(401).json({
                message: "Unauthorized request"
            })
        }

        const mess=await Mess.findOne({student: studentMongoId})
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

    //update(patch) (access: )
    cancelMeal: async(req,res,next)=>{
        const studentMongoId=req.params.studentMongoId;
        if(req.user.id !== studentMongoId){
            return res.status(401).json({
                message: "Unauthorized request"
            })
        }

        const mess=await Mess.findOne({student: studentMongoId});
        if(mess){
            // breakfast, lunch, snacks, dinner
            if(req.body.breakfast !== undefined || req.body.lunch !== undefined || req.body.snacks !== undefined || req.body.dinner !== undefined ) {
                let data,meal;
                if(req.body.breakfast !== undefined){
                    data=req.body.breakfast[0];
                    meal="breakfast";
                }
                if(req.body.lunch !== undefined){
                    data=req.body.lunch[0];
                    meal="lunch";
                }
                if(req.body.snacks !== undefined){
                    data=req.body.snacks[0];
                    meal="snacks";
                }
                if(req.body.dinner !== undefined){
                    data=req.body.dinner[0];
                    meal="dinner";
                }

                let errors=0;
                mess.fullday.forEach(e => {
                    if(e === data){
                        errors++;
                        return res.status(415).json({
                            "message": "Full day is already cancelled"
                        });
                    }
                });
                mess[meal].forEach(e => {
                    if(e === data){
                        errors++;
                        return res.status(415).json({
                            "message": `${meal} is already cancelled for tomorrow`
                        });
                    }
                });

                if(errors>0)
                return;

                mess[meal].push(data);
                Mess.findByIdAndUpdate({_id: mess._id},mess,{new:true}).then((updatedMess)=>{
                    return res.status(200).json({
                        "message": "Meal updated"
                    });
                });
            }

            // fullday
            if(req.body.fullday !== undefined) {
                let data=req.body.fullday;
                data.sort();
                const first=data[0];
                const last=data[data.length-1];

                let errors=0;

                if (mess.fullday.includes(first)) {
                    errors++;
                    return res.status(415).json({
                        "message": "Some full day is already cancelled"
                    });
                }

                data.forEach(e => {
                    mess.breakfast.forEach(e1 => {
                        if(e === e1){
                            mess.breakfast.pull(e);
                        }
                    });
                    mess.lunch.forEach(e2 => {
                        if(e === e2){
                            mess.lunch.pull(e);
                        }
                    });
                    mess.snacks.forEach(e3 => {
                        if(e === e3){
                            mess.snacks.pull(e);
                        }
                    });
                    mess.dinner.forEach(e => {
                        if(e === e4){
                            mess.dinner.pull(e);
                        }
                    });

                    mess.fullday.push(e);

                });
     

                if(errors>0)
                return;

                Mess.findByIdAndUpdate({_id: mess._id},mess,{new:true}).then((updatedMess)=>{
                    return res.status(200).json({
                        "message": "Meal cancelled"
                    });
                });
            }
        } else {
            res.status(404).json({
                message: "No mess data found"
            })
        }  
    },

     //get all data of mess by messChoice api (access: )
     getAllDataOfMess: async(req,res,next)=>{
        const messChoice = req.params.messChoice;
        const mess=await Mess.find({messChoice}).populate('student','name instituteId');
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
    
}