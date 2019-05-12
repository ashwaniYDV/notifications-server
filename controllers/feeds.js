const Feed=require('../models/feed');

module.exports={

    //get all feeds api (access: auth users)
    getAllFeeds: async(req,res,next)=>{
        const feeds=await Feed.find({})
        if(feeds){
            res.status(200).json({
                feeds: feeds
            })
        } else {
            res.status(404).json({
                message: "No feeds found"
            })
        }
        
    },


    //post a feed api (access: auth users)
    postFeed: async(req,res,next)=>{

        //create a new feed
        const feed=new Feed(req.value.body);
        await feed.save();
        //response
        res.status(200).json({
            feed: feed
        })
        
    },

    //get feed with feedId api (access: auth users)
    getFeedWithFeedId: async(req,res,next)=>{
        const feedId=req.params.feedId;

        const feed=await Feed.findOne({_id: feedId})
        if(feed){
            res.status(200).json({
                feed: feed
            })
        } else {
            res.status(404).json({
                message: "No feed found"
            })
        }
        
    },


    //delete feed using feedId if instituteId of auth user=feedPoster   api (access: feedPoster, superUser)
    deleteFeedWithFeedId: async(req,res,next)=>{
        const feedId=req.params.feedId;
        instituteId=req.user.instituteId;


        const feed=await Feed.findOne({_id: feedId})
        if(feed){
            if(feed.feedPoster==instituteId || req.user.isSuperUser==true) {
                await Feed.findByIdAndRemove({_id: feedId});
                res.status(200).json({
                    message: "Feed deleted" 
                });
            } else {
                res.status(401).json({
                    message: "Unauthorized delete request" 
                });
            }
            
        } else {
            res.status(404).json({
                message: "No feed found"
            })
        }
        
    },

    //update(patch) feed with feedId api (access: feedPoster, superUer)
    patchFeedWithFeedId: async(req,res,next)=>{
        const feedId=req.params.feedId;
        const instituteId=req.user.instituteId;

        const feed=await Feed.findOne({_id: feedId})
        if(feed){
            if(feed.feedPoster==instituteId || req.user.isSuperUser==true) {
                Feed.findByIdAndUpdate({_id: feedId},req.value.body,{new:true}).then((updatedFeed)=>{
                    res.status(200).json({
                        updatedFeed: updatedFeed
                    });
                });
            } else {
                res.status(401).json({
                    message: "Unauthorized update request" 
                });
            }
            
        } else {
            res.status(404).json({
                message: "No feed found"
            })
        }
        
    },

    //get all feeds with timestamp greater than query timestamp api (access: auth suers)
    getAllFeedsWithTimestamp: async(req,res,next)=>{
        const timestamp=req.params.timestamp;
        const query=parseInt(timestamp);

        const feeds=await Feed.find({eventDate: {$gt: query} })
        if(feeds){
            res.status(200).json({
                feeds: feeds
            })
        } else {
            res.status(404).json({
                message: "No feeds found"
            })
        }
        
    },
    
    
    //get all feeds whose evenId is greater than current timestamp api (access: auth users)
    getLatestFeedsWithCurrentTimestamp: async(req,res,next)=>{
        const timestamp=req.params.timestamp;
        const query=parseInt(timestamp);

        const latestFeeds=await Feed.find({eventId: {$gt: query} })
        if(latestFeeds){
            res.status(200).json({
                latestFeeds: latestFeeds
            })
        } else {
            res.status(404).json({
                message: "No feeds found"
            })
        }
        
    },
    

}