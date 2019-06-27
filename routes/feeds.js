//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const FeedsControllers=require('../controllers/feeds');
const {validateBody, schemas}=require('../helpers/feedsRouteHelpers');
const passport=require('passport');
const passportConf=require('../passport');


//localhost:3000/feeds/
router.route('/')
    .get(FeedsControllers.getAllFeeds)
    .post(passport.authenticate('jwt',{session: false}), validateBody(schemas.feedSchema), FeedsControllers.postFeed)

//localhost:3000/feeds/:feedId
router.route('/:feedId')
    .get(FeedsControllers.getFeedWithFeedId)
    .delete(passport.authenticate('jwt',{session: false}), FeedsControllers.deleteFeedWithFeedId)
    .patch(passport.authenticate('jwt',{session: false}), validateBody(schemas.feedSchema), FeedsControllers.patchFeedWithFeedId)

//localhost:3000/feeds/timestamp/:timestamp
//get all feeds whose evenDate is greater than query timestamp
router.route('/timestamp/:timestamp')
    .get(FeedsControllers.getAllFeedsWithTimestamp)

//localhost:3000/feeds/latestFeed/:timestamp
//get all feeds whose evenId is greater than current timestamp
router.route('/latestFeed/:timestamp')
    .get(FeedsControllers.getLatestFeedsWithCurrentTimestamp)


module.exports=router;