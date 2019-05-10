//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const FeedsControllers=require('../controllers/feeds');
//const {validateBody,validateBodySignUp,validateBodySignIn,schemas}=require('../helpers/feedsRouteHelpers');


//localhost:3000/feeds/
router.route('/')
    .get(FeedsControllers.getAllFeeds)
    .post(FeedsControllers.postFeed)


module.exports=router;