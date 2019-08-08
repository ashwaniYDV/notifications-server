const Complaint=require('../models/complaint');

module.exports={

    //get all complaints api (access: auth users)
    getAllComplaints: async(req,res,next)=>{
        const complaints=await Complaint.find({}).populate('complaintPoster', 'name instituteId').sort({_id:-1});
        if(complaints){
            res.status(200).json({
                complaints: complaints
            })
        } else {
            res.status(404).json({
                message: "No complaints found"
            })
        }
        
    },

    //post a complaint api (access: auth users)
    postComplaint: async(req,res,next)=>{
        const complaint=new Complaint(req.value.body);
        await complaint.save();
        res.status(200).json({
            complaint: complaint
        })
        
    },

    //delete a complaint with complaintId api (access: complaintPoster, superUer)
    deleteComplaint: async(req,res,next)=>{
        const complaintId=req.params.complaintId;
        const userId=req.user.id;

        const complaint=await Complaint.findOne({_id: complaintId})
        if(complaint){
            if(complaint.complaintPoster==userId || req.user.isSuperUser==true) {
                await Complaint.findByIdAndRemove({_id: complaintId});
                res.status(200).json({
                    message: "Complaint deleted"
                });
            } else {
                res.status(401).json({
                    message: "Unauthorized delete request"
                });
            }
            
        } else {
            res.status(404).json({
                message: "No complaint found"
            })
        }
        
    },

    //get complaint with complaintId api (access: auth users)
    getComplaint: async(req,res,next)=>{
        const complaintId=req.params.complaintId;

        const complaint=await Complaint.findOne({_id: complaintId}).populate('complaintPoster', 'name instituteId')
        if(complaint){
            res.status(200).json({
                complaint: complaint
            })
        } else {
            res.status(404).json({
                message: "No complaint found"
            })
        }
        
    },

    //update(patch) complaint with complaintId api (access: complaintPoster, superUer)
    patchComplaint: async(req,res,next)=>{
        const complaintId=req.params.complaintId;
        const userId=req.user.id;

        const complaint=await Complaint.findOne({_id: complaintId})
        if(complaint){
            if(complaint.complaintPoster==userId || req.user.isSuperUser==true) {
                Complaint.findByIdAndUpdate({_id: complaintId},req.value.body,{new:true}).then((updatedComplaint)=>{
                    res.status(200).json({
                        updatedComplaint: updatedComplaint
                    });
                });
            } else {
                res.status(401).json({
                    message: "Unauthorized patch request" 
                });
            }
            
        } else {
            res.status(404).json({
                message: "No complaint found"
            })
        }
        
    },

    //get complaint with complaintId api (access: auth users)
    getUserComplaints: async(req,res,next)=>{

        const complaints=await Complaint.find({complaintPoster: req.user.id}).sort({_id:-1});
        if(complaints){
            res.status(200).json({
                complaints: complaints
            })
        } else {
            res.status(404).json({
                message: "No complaint found"
            })
        }
        
    },

}