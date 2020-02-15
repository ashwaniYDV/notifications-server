const Club=require('../models/club');
const Por=require('../models/por');

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

    getAuthenticatedClubs: async(req,res,next)=>{

        const userId = req.user._id;
        const clubs = await Club.aggregate(
            [
                { "$project": {
                    "name": 1,
                    "bio": 1,
                    "description": 1,
                    "image": 1,
                    "website":1,
                    "pages":1,
                    "followers": { "$size": "$likes" },
                    "liked" : { $in: [userId, "$likes"] },
                }},
                { "$sort": { "name": 1 } },
            ]
        );

        if(clubs){
            res.status(200)
            res.send(clubs)
        } else {
            res.status(404).json({
                message: "No clubs found"
            })
        }        
    },

    //post a club api (access: auth users)
    postClub: async(req,res,next)=>{

        if (req.user._id.isSuperUser === true) {
            const club=new Club(req.value.body);
            await club.save();
            //response
            res.status(200).json({
                club: club
            })
        } else {
            res.status(502).json({
                message: "Unable to access feature!"
            })
        }
        
    },

    //get club with clubId api (access: auth users)
    getClubWithClubId: async(req,res,next)=>{
        const clubId=req.params.clubId;

        const club=await Club.findOne({_id: clubId}).populate('events');
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

    getAuthenticatedClubsById: async(req,res,next)=>{

        const currUser = req.user;
        const clubId=req.params.clubId;

        const club=await Club.findOne({_id: clubId}, {name:1, bio:1, description:1, image:1, website:1, pages:1, likes:1,});
        if(club){

            club.set( 'followers',club.likes.length, { strict: false });
            club.set( 'liked',club.likes.indexOf(currUser._id) > -1, { strict: false });

            let a = club.toObject()
            delete a.likes;

            res.status(200)
            res.send(a)
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
        const clubId = req.params.clubId;
        const currUser = req.user;

        const currPor = await Por.findOne({club:clubId, user: currUser._id});

        if ((currPor && currPor.access > 0) || currUser.isSuperUser === true) {

            Club.findByIdAndUpdate({_id: clubId},req.value.body,{new:true}).then((updatedClub)=>{
                res.status(200).send("Club updated.");
            }).catch((error) => {
                res.status(422).send("Update error!\n" + error);
                console.log(error);
            });

        } else {
            res.status(401).json({
                message: "Unauthorized user!"
            })
        }
    },

    followClub: async(req, res, next) => {
        const currUser = req.user;
        const clubId = req.params.clubId;

        const club = await Club.findOne({_id: clubId})

        if (club) {
            if (club.likes.indexOf(currUser._id) < 0) {
                club.likes.push(currUser._id)
                await club.save();
                res.status(201).json({
                    message: 'Liked'
                })
            } else {
                let i = club.likes.indexOf(currUser._id);
                club.likes.splice(i, 1);
                await club.save();
                res.status(202).json({
                    message: 'Unliked'
                })
            }
        } else {
            res.status(404).json({
                message: 'Club not found'
            })
        }
    },

    getClubFollowers: async(req, res, next) => {
        const clubId = req.params.clubId;

        const club = await Club.findOne({_id: clubId}).populate('likes', 'name instituteId');

        if (club) {
            if (club.likes) {
                res.status(200);
                res.send(club.likes)
            } else {
                res.status(402).json({
                    message: 'No likes found!'
                })
            }            
        } else {
            res.status(404).json({
                message: 'Club not found!'
            })
        }
    },
    

}