const Agenda=require('../models/agenda');

module.exports={

    //get all agenda api (access: auth users)
    getAllAgenda: async(req,res,next)=>{

        const userId = req.user._id;

        const agendas = await Agenda.aggregate(
            [
                { "$project": {
                    "poster": 1,
                    "category": 1,
                    "status": 1,
                    "problem": 1,
                    "imageUrl":1,
                    "likesCount": { "$size": "$likes" },
                    "liked" : { $in: [userId, "$likes"] },
                }},
                { "$sort": { "likesCount": -1 } },
                
            ]
        );

        if(agendas){
            const newAgendas = await Agenda.populate(agendas, {path:'poster', select:{name:1, instituteId:1}})

            res.status(200).json({
                agendas: newAgendas
            })
        } else {
            res.status(404).json({
                message: "No agendas found"
            })
        }

        // const agendas=await Agenda.find({active: true}).populate('poster', 'name instituteId').populate('likes', 'name instituteId').sort({_id:-1});
        
        
    },

    //post an agenda api (access: auth users)
    postAgenda: async(req,res,next)=>{
        const agenda=new Agenda(req.value.body);
        agenda.poster = req.user.id;
        await agenda.save();
        res.status(200).json({
            agenda: agenda
        })
    },

    //like a agenda api (access: auth users)
    reactAgenda: async(req, res, next) => {
        const currUser = req.user;
        const agendaId = req.params.agendaId;

        const agenda = await Agenda.findOne({_id: agendaId})

        if (agenda) {
            if (agenda.likes.indexOf(currUser._id) < 0) {
                agenda.likes.push(currUser)
                await agenda.save();
                res.status(201).json({
                    message: 'Liked'
                })
            } else {
                let i = agenda.likes.indexOf(currUser._id);
                agenda.likes.splice(i, 1);
                await agenda.save();
                res.status(202).json({
                    message: 'Unliked'
                })
            }
        } else {
            res.status(404).json({
                message: 'Agenda not found'
            })
        }
    },

    //get reacts on an agenda api (access: auth users)
    getAgendaReacts: async(req, res, next) => {
        const agendaId = req.params.agendaId;

        const agenda = await Agenda.findOne({_id: agendaId}).populate('likes', 'name instituteId');

        if (agenda) {
            if (agenda.likes) {
                res.status(200).json({
                    likes: agenda.likes
                })
            } else {
                res.status(402).json({
                    message: 'No likes found!'
                })
            }            
        } else {
            res.status(404).json({
                message: 'Agenda not found!'
            })
        }
    },

    // //delete a maintenance with maintenanceId api (access: maintenancePoster, superUer)
    // deleteMaintenance: async(req,res,next)=>{
    //     const maintenanceId=req.params.maintenanceId;
    //     const userId=req.user.id;

    //     const maintenance=await Maintenance.findOne({_id: maintenanceId})
    //     if(maintenance){
    //         if(maintenance.maintenancePoster==userId || req.user.isSuperUser==true) {
    //             await Maintenance.findByIdAndRemove({_id: maintenanceId});
    //             res.status(200).json({
    //                 message: "Maintenance deleted"
    //             });
    //         } else {
    //             res.status(401).json({
    //                 message: "Unauthorized delete request"
    //             });
    //         }
            
    //     } else {
    //         res.status(404).json({
    //             message: "No maintenance found"
    //         })
    //     }
        
    // },

    // //get maintenance with maintenanceId api (access: auth users)
    // getMaintenance: async(req,res,next)=>{
    //     const maintenanceId=req.params.maintenanceId;

    //     const maintenance=await Maintenance.findOne({_id: maintenanceId}).populate('maintenancePoster', 'name instituteId')
    //     if(maintenance){
    //         res.status(200).json({
    //             maintenance: maintenance
    //         })
    //     } else {
    //         res.status(404).json({
    //             message: "No maintenance found"
    //         })
    //     }
        
    // },

    // //update(patch) maintenance with maintenanceId api (access: maintenancePoster, superUer)
    // patchMaintenance: async(req,res,next)=>{
    //     const maintenanceId=req.params.maintenanceId;
    //     const userId=req.user.id;

    //     const maintenance=await Maintenance.findOne({_id: maintenanceId})
    //     if(maintenance){
    //         if(maintenance.maintenancePoster==userId || req.user.isSuperUser==true) {
    //             Maintenance.findByIdAndUpdate({_id: maintenanceId},req.value.body,{new:true}).then((updatedMaintenance)=>{
    //                 res.status(200).json({
    //                     updatedMaintenance: updatedMaintenance
    //                 });
    //             });
    //         } else {
    //             res.status(401).json({
    //                 message: "Unauthorized patch request" 
    //             });
    //         }
            
    //     } else {
    //         res.status(404).json({
    //             message: "No maintenance found"
    //         })
    //     }
        
    // },

    // //get maintenance with maintenanceId api (access: auth users)
    // getUserAgendas: async(req,res,next)=>{

    //     const maintenances=await Maintenance.find({maintenancePoster: req.user.id}).sort({_id:-1});
    //     if(maintenances){
    //         res.status(200).json({
    //             maintenances: maintenances
    //         })
    //     } else {
    //         res.status(404).json({
    //             message: "No maintenance found"
    //         })
    //     }
        
    // },

}