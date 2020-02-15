//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const UsersControllers=require('../controllers/users');
const {validateBody,validateBodySignUp,validateBodySignIn,schemas}=require('../helpers/usersRouteHelpers');
const passport=require('passport');
const passportConf=require('../passport');

//localhost:3000/users/signup
router.route('/signUp')
    .post(validateBodySignUp(schemas.authSchemaSignUp),UsersControllers.signUp)

//localhost:3000/users/signin    
router.route('/signIn')
    .post(validateBodySignIn(schemas.authSchemaSignIn), passport.authenticate('local',{session: false}), UsersControllers.signIn)

//localhost:3000/users/:id
router.route('/:userId')
    .get(passport.authenticate('jwt',{session: false}), UsersControllers.getUser)

//localhost:3000/users/activate
router.route('/activate')
    .post(UsersControllers.activateUser)

//localhost:3000/users/forgotpwd
router.route('/forgotpwd')
    .post(UsersControllers.forgotPwd)

//localhost:3000/users/resetpwd
router.route('/resetpwd')
    .post(UsersControllers.resetPwd)

router.route('/update')
    .post(passport.authenticate('jwt',{session: false}), validateBody(schemas.userSchemaPatch), UsersControllers.updateUserDetails)


module.exports=router;