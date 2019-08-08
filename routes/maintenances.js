const router=require('express-promise-router')();
const MaintenancesControllers=require('../controllers/maintenances');
const {validateBody, schemas}=require('../helpers/maintenancesRouteHelpers');
const passport=require('passport');
const passportConf=require('../passport');

//localhost:3000/maintenances
router.route('/')
    .get(passport.authenticate('jwt',{session: false}), MaintenancesControllers.getAllMaintenances)
    .post(passport.authenticate('jwt',{session: false}), validateBody(schemas.maintenanceSchema), MaintenancesControllers.postMaintenance)

//localhost:3000/maintenances/user (to get lostnfounds posted by logged-in user)
router.route('/user')
    .get(passport.authenticate('jwt',{session: false}), MaintenancesControllers.getUserMaintenances)

//localhost:3000/maintenances/:maintenanceId
router.route('/:maintenanceId')
    .get(passport.authenticate('jwt',{session: false}), MaintenancesControllers.getMaintenance)
    .delete(passport.authenticate('jwt',{session: false}), MaintenancesControllers.deleteMaintenance)
    .patch(passport.authenticate('jwt',{session: false}), validateBody(schemas.maintenanceSchema), MaintenancesControllers.patchMaintenance)

module.exports=router;