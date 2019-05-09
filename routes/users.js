//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const UsersControllers=require('../controllers/users');
const {validateBody,schemas}=require('../helpers/routeHelpers');
const passport=require('passport');
const passportConf=require('../passport');


//localhost:3000/users/signup
router.route('/signUp')
    .post(validateBody(schemas.authSchemaSignUp),UsersControllers.signUp)

//localhost:3000/users/signin    
router.route('/signIn')
    .post(validateBody(schemas.authSchemaSignIn), passport.authenticate('local',{session: false}), UsersControllers.signIn)

//localhost:3000/users/secret
router.route('/secret')
    .get(passport.authenticate('jwt',{session: false}),UsersControllers.secret)

//localhost:3000/users/
router.route('/')
    .get(UsersControllers.getAllUsers)

//localhost:3000/users/:id
router.route('/:userId')
    .get(UsersControllers.getUser)


router.route('/instituteId/:instituteId')
    .get(UsersControllers.getUserByInstituteId)

router.route('/batch/:batch')
    .get(UsersControllers.getUsersByBatch)

router.route('/branch/:branch')
    .get(UsersControllers.getUsersByBranch)


router.route('/rollno/:rollno')
    .get(UsersControllers.getUserByRollno)

module.exports=router;