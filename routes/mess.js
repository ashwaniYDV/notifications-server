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

//localhost:3000/mess/manager/:studentMongoId   
router.route('/manager/:studentMongoId')
    .patch(validateBody(schemas.messSchema), MessControllers.manageMeal)



//localhost:3000/mess/get/:messName   (get all student data of particular mess)
router.route('/get/:messName')
    .get(MessControllers.getAllDataOfMess)

//localhost:3000/mess/cancelled/:messName    (get all cancelled meals data of particular mess)
router.route('/cancelled/:messName')
    .get(MessControllers.getAllCancelledDataOfMess)

module.exports=router;