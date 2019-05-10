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

    
    //post a feed api (access: all)
    postFeed: async(req,res,next)=>{

        //create a new feed
        const feed=new Feed(req.body);
        await feed.save();
        //response
        res.status(200).json({
            feed: feed
        })
        
    },
    

}