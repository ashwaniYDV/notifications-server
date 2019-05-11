//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const FeedsControllers=require('../controllers/feeds');
const {validateBody, schemas}=require('../helpers/feedsRouteHelpers');


//localhost:3000/feeds/
router.route('/')
    .get(FeedsControllers.getAllFeeds)
    .post(validateBody(schemas.feedSchema), FeedsControllers.postFeed)

    //localhost:3000/feeds/:feedId
router.route('/:feedId')
    .get(FeedsControllers.getFeedWithFeedId)
    .delete(FeedsControllers.deleteFeedWithFeedId)

    //localhost:3000/feeds/timestamp/:timestamp
router.route('timestamp/:timestamp')
    .get(FeedsControllers.getAllFeedsWithTimestamp)


module.exports=router;