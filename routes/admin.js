const router=require('express-promise-router')();
const AdminControllers=require('./../controllers/admin');
const passport=require('passport');
const {validateBody, schemas}=require('../helpers/adminRouteHelper');

//localhost:3000/admin/notify
router.route('/notify')
    .post(passport.authenticate('jwt',{session: false}), validateBody(schemas.notificationSchema), AdminControllers.sendNotification)

module.exports=router;