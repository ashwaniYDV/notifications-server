const Maintenance=require('../models/maintenance');

module.exports={

    //get all maintenances api (access: auth users)
    getAllMaintenances: async(req,res,next)=>{
        const maintenances=await Maintenance.find({}).populate('maintenancePoster', 'name instituteId').sort({_id:-1});
        if(maintenances){
            res.status(200).json({
                maintenances: maintenances
            })
        } else {
            res.status(404).json({
                message: "No maintenances found"
            })
        }
        
    },

    //post a maintenance api (access: auth users)
    postMaintenance: async(req,res,next)=>{
        const maintenance=new Maintenance(req.value.body);
        await maintenance.save();
        res.status(200).json({
            maintenance: maintenance
        })
        
    },

    //delete a maintenance with maintenanceId api (access: maintenancePoster, superUer)
    deleteMaintenance: async(req,res,next)=>{
        const maintenanceId=req.params.maintenanceId;
        const userId=req.user.id;

        const maintenance=await Maintenance.findOne({_id: maintenanceId})
        if(maintenance){
            if(maintenance.maintenancePoster==userId || req.user.isSuperUser==true) {
                await Maintenance.findByIdAndRemove({_id: maintenanceId});
                res.status(200).json({
                    message: "Maintenance deleted"
                });
            } else {
                res.status(401).json({
                    message: "Unauthorized delete request"
                });
            }
            
        } else {
            res.status(404).json({
                message: "No maintenance found"
            })
        }
        
    },

    //get maintenance with maintenanceId api (access: auth users)
    getMaintenance: async(req,res,next)=>{
        const maintenanceId=req.params.maintenanceId;

        const maintenance=await Maintenance.findOne({_id: maintenanceId}).populate('maintenancePoster', 'name instituteId')
        if(maintenance){
            res.status(200).json({
                maintenance: maintenance
            })
        } else {
            res.status(404).json({
                message: "No maintenance found"
            })
        }
        
    },

    //update(patch) maintenance with maintenanceId api (access: maintenancePoster, superUer)
    patchMaintenance: async(req,res,next)=>{
        const maintenanceId=req.params.maintenanceId;
        const userId=req.user.id;

        const maintenance=await Maintenance.findOne({_id: maintenanceId})
        if(maintenance){
            if(maintenance.maintenancePoster==userId || req.user.isSuperUser==true) {
                Maintenance.findByIdAndUpdate({_id: maintenanceId},req.value.body,{new:true}).then((updatedMaintenance)=>{
                    res.status(200).json({
                        updatedMaintenance: updatedMaintenance
                    });
                });
            } else {
                res.status(401).json({
                    message: "Unauthorized patch request" 
                });
            }
            
        } else {
            res.status(404).json({
                message: "No maintenance found"
            })
        }
        
    },

    //get maintenance with maintenanceId api (access: auth users)
    getUserMaintenances: async(req,res,next)=>{

        const maintenances=await Maintenance.find({maintenancePoster: req.user.id}).sort({_id:-1});
        if(maintenances){
            res.status(200).json({
                maintenances: maintenances
            })
        } else {
            res.status(404).json({
                message: "No maintenance found"
            })
        }
        
    },

}