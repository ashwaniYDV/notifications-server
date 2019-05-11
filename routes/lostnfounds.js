//const express=require('express');
//const router=express.Router();
const router=require('express-promise-router')();
const LostnfoundsControllers=require('../controllers/lostnfounds');
const {validateBody, schemas}=require('../helpers/lostnfoundsRouteHelpers');


//localhost:3000/lostnfounds/
router.route('/')
    .get(LostnfoundsControllers.getAllLostnfounds)
    .post(validateBody(schemas.lostnfoundSchema), LostnfoundsControllers.postLostnfound)


//localhost:3000/lostnfounds/:lostnfoundId
router.route('/:lostnfoundId')
    .get(LostnfoundsControllers.getLostnfound)
    .delete(LostnfoundsControllers.deleteLostnfound)
    .patch(validateBody(schemas.lostnfoundSchema), LostnfoundsControllers.patchLostnfound)


module.exports=router;