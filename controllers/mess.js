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

    //post (access: auth users)
    postMess: async(req,res,next)=>{
        const result=await Mess.findOne({studentMongoId: req.value.body.studentMongoId});
        if(result){
            res.status(403).json({
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

    //get (access: auth users)
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

    //delete api (access: feedPoster, superUser)
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

    //update(patch) (access: feedPoster, superUer)
    patchMessWithStudentMongoId: async(req,res,next)=>{
        const studentMongoId=req.params.studentMongoId;

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

    //update(patch) (access: feedPoster, superUer)
    cancelMeal: async(req,res,next)=>{
        const studentMongoId=req.params.studentMongoId;

        const mess=await Mess.findOne({studentMongoId: studentMongoId});
        if(mess){
            let currentMeal=req.value.body.currentMeal;
            let result=currentMeal.split('_');
            let dd=parseInt(result[0]);
            let mm=parseInt(result[1]);
            let yyyy=parseInt(result[2]);
            let mealno=parseInt(result[3]);
            let mealstatus=parseInt(result[4]);
            let date=new Date().getDate();
            let month=new Date().getMonth()+1;
            let year=new Date().getFullYear();
            let hours=new Date().getHours()+1;

            if((dd<date && mm<=month && yyyy<=year)) {
                return res.status(401).json({message: "This meal does not exist!"});
            }

            if(mealno==1 && dd==date){
                return res.status(401).json({message: "You can cancel the meal only before 10 hours from closing time."});
            }
            if(mealno==2 && dd==date && ((15-hours)<10)){
                return res.status(401).json({message: "You can cancel the meal only before 10 hours from closing time."});
            }
            if(mealno==3 && dd==date && ((18-hours)<10)){
                return res.status(401).json({message: "You can cancel the meal only before 10 hours from closing time."});
            }
            if(mealno==4 && dd==date && ((22-hours)<10)){
                return res.status(401).json({message: "You can cancel the meal only before 10 hours from closing time."});
            }

            totalCancelledMealsInCurrentMonth=0;
            if(mess.cancelledMeals.length>0){
                mess.cancelledMeals.forEach((data)=>{
                    if(data==currentMeal){
                        return res.status(401).json({message: "Meal already cancelled."});
                    }
                    let result=data.split('_');
                    let dd=parseInt(result[0]);
                    let mm=parseInt(result[1]);
                    let yyyy=parseInt(result[2]);
                    let mealno=parseInt(result[3]);
                    if(mm==month && yyyy==year){
                        totalCancelledMealsInCurrentMonth++;
                    }
                })
            }
            if(totalCancelledMealsInCurrentMonth>10) {
                return res.status(401).json({message: "You can cancel only 10 meals per month."});
            }

            let oldData=mess.cancelledMeals;
            oldData.push(currentMeal);
            Mess.findByIdAndUpdate({_id: mess._id},{cancelledMeals: oldData},{new:true}).then((updatedMess)=>{
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