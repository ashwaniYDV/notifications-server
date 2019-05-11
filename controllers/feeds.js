const Feed=require('../models/feed');

module.exports={

    //get all feeds api (access: all)
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


    //get feed with feedId api (access: all)
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


    //delete feed with feedId api (access: all)
    deleteFeedWithFeedId: async(req,res,next)=>{
        const feedId=req.params.feedId;

        const feed=await Feed.findOne({_id: feedId})
        if(feed){
            await Feed.findByIdAndRemove({_id: feedId});
            res.status(200).json({
                message: "Feed deleted" 
            });
        } else {
            res.status(404).json({
                message: "No feed found"
            })
        }
        
    },

    //get all feeds with timestamp greater than query timestamp api (access: all)
    getAllFeedsWithTimestamp: async(req,res,next)=>{
        const timestamp=req.params.timestamp;

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
    
    //post a feed api (access: all)
    postFeed: async(req,res,next)=>{

        //create a new feed
        const feed=new Feed(req.value.body);
        await feed.save();
        //response
        res.status(200).json({
            feed: feed
        })
        
    },
    

}