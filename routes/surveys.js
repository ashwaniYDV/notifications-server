const router = require('express-promise-router')();
const SurveyControllers = require('../controllers/surveys');
const {validateBody, schemas} = require('../helpers/surveysRouteHelper');
const passport = require('passport');
const passportConf = require('../passport');

//localhost:3000/surveys
router.route('/')
    .get(passport.authenticate('jwt', {session: false}), SurveyControllers.getAllSurveys)
    .post(passport.authenticate('jwt', {session: false}), validateBody(schemas.surveySchema), SurveyControllers.postSurvey)

router.route('/fill/:surveyId')
    .post(passport.authenticate('jwt', {session: false}), validateBody(schemas.responseSchema), SurveyControllers.answerSurvey)

router.route('/:surveyId')
    .get(passport.authenticate('jwt', {session: false}), SurveyControllers.getSurveyById)

router.route('/:surveyId/addquestion')
    .post(passport.authenticate('jwt', {session: false}), validateBody(schemas.responseSchema), SurveyControllers.addQuestionToSurvey)

// router.route('/:surveyId/editquestion/:questionId')
//     .post(passport.authenticate('jwt', {session: false}), validateBody(schemas.responseSchema), SurveyControllers.answerSurvey)

module.exports = router;