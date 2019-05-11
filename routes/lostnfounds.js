//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const LostnfoundsControllers=require('../controllers/lostnfounds');
const {validateBody, schemas}=require('../helpers/lostnfoundsRouteHelpers');
const passport=require('passport');
const passportConf=require('../passport');


//localhost:3000/lostnfounds/
router.route('/')
    .get(passport.authenticate('jwt',{session: false}), LostnfoundsControllers.getAllLostnfounds)
    .post(passport.authenticate('jwt',{session: false}), validateBody(schemas.lostnfoundSchema), LostnfoundsControllers.postLostnfound)


//localhost:3000/lostnfounds/:lostnfoundId
router.route('/:lostnfoundId')
    .get(passport.authenticate('jwt',{session: false}), LostnfoundsControllers.getLostnfound)
    .delete(passport.authenticate('jwt',{session: false}), LostnfoundsControllers.deleteLostnfound)
    .patch(passport.authenticate('jwt',{session: false}), validateBody(schemas.lostnfoundSchema), LostnfoundsControllers.patchLostnfound)


module.exports=router;