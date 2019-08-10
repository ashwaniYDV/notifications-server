const router=require('express-promise-router')();
const PorsControllers=require('../controllers/pors');
const {validateBody, schemas}=require('../helpers/porsRouteHelpers');
const passport=require('passport');
const passportConf=require('../passport');

//localhost:3000/pors
router.route('/')
    .get(passport.authenticate('jwt',{session: false}),PorsControllers.getAllPors)
    .post(passport.authenticate('jwt',{session: false}), validateBody(schemas.porSchema), PorsControllers.postPor)

//localhost:3000/pors/club/:clubId
router.route('/club/:clubId')
    .get(passport.authenticate('jwt',{session: false}),PorsControllers.getClubPors)

//localhost:3000/pors/:porId
router.route('/:porId')
    .get(passport.authenticate('jwt',{session: false}),PorsControllers.getPorWithPorId)
    .delete(passport.authenticate('jwt',{session: false}), PorsControllers.deletePorWithPorId)
    .patch(passport.authenticate('jwt',{session: false}), validateBody(schemas.porSchema), PorsControllers.patchPorWithPorId)

module.exports=router;