const {FCM_KEY}=require('../configs/config');

module.exports={

    sendNotification: async(req,res,next)=>{

        const json = req.value.body;
        const key = FCM_KEY

        await feed.save();
        res.status(200).json({
            feed: feed
        })
    },

}