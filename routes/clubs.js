//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const ClubsControllers=require('../controllers/clubs');
const {validateBody, schemas}=require('../helpers/clubsRouteHelpers');
const passport=require('passport');
const passportConf=require('../passport');


//localhost:3000/clubs/
router.route('/')
    .get(ClubsControllers.getAllClubs)
    .post(validateBody(schemas.clubSchema), ClubsControllers.postClub)


//localhost:3000/clubs/:clubId
router.route('/:clubId')
    .get(ClubsControllers.getClubWithClubId)
    .delete(passport.authenticate('jwt',{session: false}), ClubsControllers.deleteClubWithClubId)
    .patch(passport.authenticate('jwt',{session: false}), validateBody(schemas.clubSchema), ClubsControllers.patchClubWithClubId)


module.exports=router;