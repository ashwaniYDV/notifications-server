const router=require('express-promise-router')();
const ComplaintsControllers=require('../controllers/complaints');
const {validateBody, schemas}=require('../helpers/complaintsRouteHelpers');
const passport=require('passport');
const passportConf=require('../passport');

//localhost:3000/complaints
router.route('/')
    .get(passport.authenticate('jwt',{session: false}), ComplaintsControllers.getAllComplaints)
    .post(passport.authenticate('jwt',{session: false}), validateBody(schemas.complaintSchema), ComplaintsControllers.postComplaint)

//localhost:3000/complaints/user (to get complaints posted by logged-in user)
router.route('/user')
    .get(passport.authenticate('jwt',{session: false}), ComplaintsControllers.getUserComplaints)

//localhost:3000/complaints/:complaintId
router.route('/:complaintId')
    .get(passport.authenticate('jwt',{session: false}), ComplaintsControllers.getComplaint)
    .delete(passport.authenticate('jwt',{session: false}), ComplaintsControllers.deleteComplaint)
    .patch(passport.authenticate('jwt',{session: false}), validateBody(schemas.complaintSchema), ComplaintsControllers.patchComplaint)

module.exports=router;