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

//localhost:3000/users/secret
router.route('/secret')
    .get(passport.authenticate('jwt',{session: false}),UsersControllers.secret)

//localhost:3000/users/
router.route('/')
    .get(passport.authenticate('jwt',{session: false}),UsersControllers.getAllUsers)

//localhost:3000/users/:id
router.route('/:userId')
    .get(passport.authenticate('jwt',{session: false}), UsersControllers.getUser)
    .patch(passport.authenticate('jwt',{session: false}), validateBodySignUp(schemas.userSchemaPatch), UsersControllers.patchUser)


router.route('/instituteId/:instituteId')
    .get(UsersControllers.getUserByInstituteId)

router.route('/batch/:batch')
    .get(UsersControllers.getUsersByBatch)

router.route('/branch/:branch')
    .get(UsersControllers.getUsersByBranch)

router.route('/batchAndBranch/:batch/:branch')
    .get(UsersControllers.getUsersByBatchAndBranch)


module.exports=router;