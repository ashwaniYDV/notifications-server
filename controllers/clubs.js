const Club=require('../models/club');

module.exports={

    //get all clubs api (access: auth users)
    getAllClubs: async(req,res,next)=>{
        const clubs=await Club.find({})
        if(clubs){
            res.status(200).json({
                clubs: clubs
            })
        } else {
            res.status(404).json({
                message: "No clubs found"
            })
        }
        
    },


    //post a club api (access: auth users)
    postClub: async(req,res,next)=>{

        //create a new feed
        const club=new Club(req.value.body);
        await club.save();
        //response
        res.status(200).json({
            club: club
        })
        
    },


    //get club with clubId api (access: auth users)
    getClubWithClubId: async(req,res,next)=>{
        const clubId=req.params.clubId;

        const club=await Club.findOne({_id: clubId})
        if(club){
            res.status(200).json({
                club: club
            })
        } else {
            res.status(404).json({
                message: "No club found"
            })
        }
        
    },


    //delete club using clubId api (access: superUser)
    deleteClubWithClubId: async(req,res,next)=>{
        const clubId=req.params.clubId;

        const club=await Club.findOne({_id: clubId})
        if(club){
            if(req.user.isSuperUser==true) {
                await Club.findByIdAndRemove({_id: clubId});
                res.status(200).json({
                    message: "Club deleted" 
                });
            } else {
                res.status(401).json({
                    message: "Unauthorized delete request" 
                });
            }
            
        } else {
            res.status(404).json({
                message: "No club found"
            })
        }
        
    },


    //update(patch) club with clubId api (access: superUer)
    patchClubWithClubId: async(req,res,next)=>{
        const clubId=req.params.clubId;

        const club=await Club.findOne({_id: clubId})
        if(club){
            if(req.user.isSuperUser==true) {
                Club.findByIdAndUpdate({_id: clubId},req.value.body,{new:true}).then((updatedClub)=>{
                    res.status(200).json({
                        updatedClub: updatedClub
                    });
                });
            } else {
                res.status(401).json({
                    message: "Unauthorized update request"
                });
            }
            
        } else {
            res.status(404).json({
                message: "No club found"
            })
        }
        
    },
    

}