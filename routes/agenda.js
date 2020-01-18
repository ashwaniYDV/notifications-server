const router = require('express-promise-router')();
const AgendaControllers = require('../controllers/agenda');
const {
    validateBody,
    schemas
} = require('../helpers/agendaRouteHelpers');
const passport = require('passport');
const passportConf = require('../passport');

//localhost:3000/agendas
router.route('/')
    .get(passport.authenticate('jwt', {session: false}), AgendaControllers.getAllAgenda)
    .post(passport.authenticate('jwt', {session: false}), validateBody(schemas.agendaSchema), AgendaControllers.postAgenda)

//localhost:3000/agendas/react/{agendaId}
router.route('/react/:agendaId')
    .post(passport.authenticate('jwt', {session: false}), AgendaControllers.reactAgenda)
    .get(passport.authenticate('jwt', {session: false}), AgendaControllers.getAgendaReacts)

// //localhost:3000/agendas/user
// router.route('/user')
//     .get(passport.authenticate('jwt',{session: false}), AgendaControllers.getUserAgendas)

// //localhost:3000/maintenances/:maintenanceId
// router.route('/:maintenanceId')
//     .get(passport.authenticate('jwt',{session: false}), AgendaControllers.getMaintenance)
//     .delete(passport.authenticate('jwt',{session: false}), AgendaControllers.deleteMaintenance)
//     .patch(passport.authenticate('jwt',{session: false}), validateBody(schemas.maintenanceSchema), AgendaControllers.patchMaintenance)

module.exports = router;