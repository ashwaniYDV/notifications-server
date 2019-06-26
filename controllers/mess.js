const Mess=require('../models/mess');

module.exports={

    //get all mess api (access: )
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

    //post (access: )
    postMess: async(req,res,next)=>{
        const result=await Mess.findOne({studentMongoId: req.value.body.studentMongoId});
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
        let mess=await Mess.findOne({studentMongoId: studentMongoId}).populate('student','name instituteId');
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

    //update(patch) (access: )
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

    //update(patch) (access: )
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

            let errorCount=0;

            if((dd<date && mm<=month && yyyy<=year)) {
                errorCount++;
                return res.status(404).json({message: "This meal does not exist!"});
            }

            if((mealno==1 || mealno==2 || mealno==3 || mealno==4) && dd==date){
                errorCount++;
                return res.status(401).json({message: "You can cancel meals for tomorrow and onwards. You cannot cancel todays meal."});
            }

            totalCancelledMealsInCurrentMonth=0;
            mess.cancelledMeals.forEach((data)=>{
                if(data==currentMeal){
                    errorCount++;
                    return res.status(422).json({message: "Meal already cancelled."});
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
            if(totalCancelledMealsInCurrentMonth>10) {
                errorCount++;
                return res.status(401).json({message: "You can cancel only 10 meals per month."});
            }

            if(errorCount==0){
                let oldData=mess.cancelledMeals;
                oldData.push(currentMeal);
                Mess.findByIdAndUpdate({_id: mess._id},{cancelledMeals: oldData},{new:true}).then((updatedMess)=>{
                    res.status(200).json({
                        updatedMess: updatedMess
                    });
                });
            }
        } else {
            res.status(404).json({
                message: "No mess data found"
            })
        }  
    },

    //update(patch) (access: )
    manageMeal: async(req,res,next)=>{
        const studentMongoId=req.params.studentMongoId;

        const mess=await Mess.findOne({studentMongoId: studentMongoId})
        if(mess){
            let currentMeal=req.value.body.currentMeal;
            let result=currentMeal.split('_');
            let dd=parseInt(result[0]);
            let mm=parseInt(result[1]);
            let yyyy=parseInt(result[2]);
            let mealno=parseInt(result[3]);
            let mealstatus=parseInt(result[4]);

            let errorCount=0;
            mess.cancelledMeals.forEach((data)=>{
                let result=data.split('_');
                if(dd==parseInt(result[0]) && mm==parseInt(result[1]) && yyyy==parseInt(result[2]) && mealno==parseInt(result[3])){
                    errorCount++;
                    return res.status(200).json({
                        "message": "Meal is cancelled"
                    });
                }
            })

            if(errorCount==0){
                let oldData=mess.takenMeals;
                let newMeal=result[0]+"_"+result[1]+"_"+result[2]+"_"+result[3]+"_"+"1";
                oldData.push(newMeal);
                Mess.findByIdAndUpdate({_id: mess._id},{takenMeals: oldData},{new:true}).then((updatedMess)=>{
                    res.status(200).json({
                        updatedMess: updatedMess
                    });
                });
            }
        } else {
            res.status(404).json({
                message: "No mess data found"
            })
        }  
    },

    //getAllDataOfMess (access: )
    getAllDataOfMess: async(req,res,next)=>{
        const messName=req.params.messName;
        let mess=await Mess.find({messChoice: messName},{studentMongoId: 1, student: 2, cancelledMeals: 6}).populate('student','name instituteId');
        if(mess.length){
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