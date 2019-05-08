//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const UsersControllers=require('../controllers/users');
const {validateBody,schemas}=require('../helpers/routeHelpers');
const passport=require('passport');
const passportConf=require('../passport');


router.route('/signUp')
    .post(validateBody(schemas.authSchemaSignUp),UsersControllers.signUp)

router.route('/signIn')
    .post(validateBody(schemas.authSchemaSignIn), passport.authenticate('local',{session: false}), UsersControllers.signIn)

router.route('/secret')
    .get(passport.authenticate('jwt',{session: false}),UsersControllers.secret)

module.exports=router;