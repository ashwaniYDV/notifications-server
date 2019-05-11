//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const LostnfoundsControllers=require('../controllers/lostnfounds');
//const {validateBody, schemas}=require('../helpers/feedsRouteHelpers');


//localhost:3000/lostnfounds/
router.route('/')
    .get(LostnfoundsControllers.getAllLostnfounds)
    .post(LostnfoundsControllers.postLostnfound)


//localhost:3000/lostnfounds/:lostnfoundId
router.route('/:lostnfoundId')
    .get(LostnfoundsControllers.getLostnfound)
    .delete(LostnfoundsControllers.deleteLostnfound)
    .patch(LostnfoundsControllers.patchLostnfound)

    /*
//localhost:3000/feeds/timestamp/:timestamp
//get all feeds whose evenDate is greater than query timestamp
router.route('/timestamp/:timestamp')
    .get(FeedsControllers.getAllFeedsWithTimestamp)

//localhost:3000/feeds/latestFeed/:timestamp
//get all feeds whose evenId is greater than current timestamp
router.route('/latestFeed/:timestamp')
    .get(FeedsControllers.getLatestFeedsWithCurrentTimestamp)
*/

module.exports=router;