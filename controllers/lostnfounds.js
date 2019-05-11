const Lostnfound=require('../models/lostnfound');

module.exports={

    //get all lostnfounds api (access: all)
    getAllLostnfounds: async(req,res,next)=>{
        const lostnfounds=await Lostnfound.find({})
        if(lostnfounds){
            res.status(200).json({
                lostnfounds: lostnfounds
            })
        } else {
            res.status(404).json({
                message: "No lostnfounds found"
            })
        }
        
    },


    //post a lostnfound api (access: all)
    postLostnfound: async(req,res,next)=>{

        //create a new lostnfound
        const lostnfound=new Lostnfound(req.body);
        await lostnfound.save();
        //response
        res.status(200).json({
            lostnfound: lostnfound
        })
        
    },


    //delete a lostnfound with lostnfoundId api (access: all)
    deleteLostnfound: async(req,res,next)=>{
        const lostnfoundId=req.params.lostnfoundId;

        const lostnfound=await Lostnfound.findOne({_id: lostnfoundId})
        if(lostnfound){
            await Lostnfound.findByIdAndRemove({_id: lostnfoundId});
            res.status(200).json({
                message: "Lostnfound deleted"
            });
        } else {
            res.status(404).json({
                message: "No lostnfound found"
            })
        }
        
    },


    //get lostnfound with lostnfoundId api (access: all)
    getLostnfound: async(req,res,next)=>{
        const lostnfoundId=req.params.lostnfoundId;

        const lostnfound=await Lostnfound.findOne({_id: lostnfoundId})
        if(lostnfound){
            res.status(200).json({
                lostnfound: lostnfound
            })
        } else {
            res.status(404).json({
                message: "No lostnfound found"
            })
        }
        
    },    

}