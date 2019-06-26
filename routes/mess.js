const router=require('express-promise-router')();
const MessControllers=require('../controllers/mess');
const {validateBody, schemas}=require('../helpers/messRouteHelpers');
const passport=require('passport');
const passportConf=require('../passport');


//localhost:3000/mess/
router.route('/')
    .get(MessControllers.getAllMess)
    .post(validateBody(schemas.messSchema), MessControllers.postMess)

//localhost:3000/mess/:studentMongoId
router.route('/:studentMongoId')
    .get(MessControllers.getMessWithStudentMongoId)
    .delete(MessControllers.deleteMessWithStudentMongoId)
    .patch(validateBody(schemas.messSchema), MessControllers.patchMessWithStudentMongoId)

//localhost:3000/mess/cancel/:studentMongoId   
router.route('/cancel/:studentMongoId')
    .patch(validateBody(schemas.messSchema), MessControllers.cancelMeal)


module.exports=router;