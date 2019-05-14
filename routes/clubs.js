//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const ClubsControllers=require('../controllers/clubs');
//const {validateBody, schemas}=require('../helpers/feedsRouteHelpers');
const passport=require('passport');
const passportConf=require('../passport');


//localhost:3000/feeds/
router.route('/')
    .get(ClubsControllers.getAllClubs)
    .post(ClubsControllers.postClub)


//localhost:3000/feeds/:feedId
router.route('/:clubId')
    .get(ClubsControllers.getClubWithClubId)
    .delete(passport.authenticate('jwt',{session: false}), ClubsControllers.deleteClubWithClubId)
    .patch(passport.authenticate('jwt',{session: false}), ClubsControllers.patchClubWithClubId)


module.exports=router;