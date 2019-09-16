const router=require('express-promise-router')();
const MessControllers=require('../controllers/mess');
const {validateBody, schemas}=require('../helpers/messRouteHelpers');
const passport=require('passport');
const passportConf=require('../passport');

//localhost:3000/mess/
router.route('/')
    .get(MessControllers.getAllMess)
    .post(passport.authenticate('jwt',{session: false}), validateBody(schemas.messSchema), MessControllers.postMess)

//localhost:3000/mess/:studentMongoId
router.route('/:studentMongoId')
    .get(MessControllers.getMessWithStudentMongoId)
    .delete(passport.authenticate('jwt',{session: false}), MessControllers.deleteMessWithStudentMongoId)
    .patch(passport.authenticate('jwt',{session: false}), validateBody(schemas.messSchema), MessControllers.patchMessWithStudentMongoId)

//localhost:3000/mess/cancel/:studentMongoId   
router.route('/cancel/:studentMongoId')
    .post(passport.authenticate('jwt',{session: false}), MessControllers.cancelMeal)


//localhost:3000/mess/data/:messChoice   (get all student data of particular mess)
router.route('/data/:messChoice')
    .get(MessControllers.getAllDataOfMess)


module.exports=router;