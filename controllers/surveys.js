const Survey = require('../models/survey');

module.exports = {

    getAllSurveys: async (req, res, next) => {

        const userId = req.user._id;
        const surveys = await Survey.find({active: true}, 'poster title description accepting_responses anonymous limit_responses')
            .populate('poster', 'name instituteId image').sort({survey_date: -1});

        if (surveys.length > 0) {
            res.status(200);
            res.send(surveys)
        } else {
            res.status(404);
            res.send("No surveys found")
        }
    },

    //post an agenda api (access: auth users)
    postSurvey: async (req, res, next) => {
        const survey = new Survey(req.value.body);
        survey.poster = req.user._id;
        await survey.save();
        res.status(200);
        res.send(survey);
    },

    answerSurvey: async (req, res, next) => {
        const surveyId = req.params.surveyId;
        const currUser = req.user;

        const survey = await Survey.findById(surveyId);

        if (survey) {

            const b = req.value.body;

            if (survey.anonymous === false) {
                b.response_user = currUser._id;

                if (survey.limit_responses === true) {
                    for (const resp in survey.responses) {
                        if (resp.response_user == currUser._id) {
                            res.status(406);
                            res.send("Already filled the survey");
                            break;
                        }
                    }
                }
            }

            survey.responses.push(req.value.body);
            await survey.save();
            res.status(200);
            res.send(survey);
        } else {
            res.status(404);
            res.send("Survey not found");
        }
    },

    getSurveyById: async (req, res, next) => {
        const surveyId = req.params.surveyId;
        const currUser = req.user;

        const survey = await Survey.findById(surveyId, 'poster title description accepting_responses anonymous limit_responses questions');

        if (survey) {
            res.status(200);
            res.send(survey);
        } else {
            res.status(404);
            res.send("Survey not found");
        }
    },

    getSurveyQuestions: async (req, res, next) => {
        const surveyId = req.params.surveyId;

        const survey = await Survey.findById(surveyId, 'questions');
        const questions = survey.questions;

        if (questions) {
            res.status(200);
            res.send(questions);
        } else {
            res.status(404);
            res.send("Survey not found");
        }
    },

    addQuestionToSurvey: async (req, res, next) => {
        const surveyId = req.params.surveyId;
        const currUser = req.user;

        const survey = await Survey.findById(surveyId);

        if (survey) {
            
            if (currUser._id != String(survey.poster)) {
                res.status(401).send("Unauthorised user!");
            } else {

                survey.questions.push(req.value.body);
                await survey.save();

                res.status(200).send("Question Added");

            }
        } else {
            res.status(404);
            res.send("Survey not found");
        }
    },

    getSurveyResponses: async (req, res, next) => {
        const surveyId = req.params.surveyId;
        const userId = req.user._id;

        const survey = await Survey.findById(surveyId);

        let access = false;
        if (String(survey.poster) == userId) access = true;
        if (access === false) {
            for (const a in survey.responses_access) {
                if (String(a.user) == userId) {
                    access = true;
                    break;
                }
            }
        }

        if (access === true) {
            const responses = survey.responses;
            if (responses) {
                res.status(200).send(responses);
            } else {
                res.status(404);
                res.send("Survey not found");
            }
        } else {
            res.status(401);
            res.send("Unauthorised User!");
        }
    },

    changeAcceptingResponseStatus: async (req, res, next) => {
        const surveyId = req.params.surveyId;
        const currUser = req.user;

        const survey = await Survey.findById(surveyId);

        if (survey) {

            if (survey.poster != currUser._id) {
                res.status(401);
                res.send("Unauthorised user!");
            } else {

                survey.accepting_responses = !survey.accepting_responses;
                await survey.save();

                res.status(200);
                res.send(survey);
            }
        } else {
            res.status(404);
            res.send("Survey not found");
        }
    },

    addResponseAccess: async (req, res, next) => {
        const surveyId = req.params.surveyId;
        const currUser = req.user;

        const survey = await Survey.findById(surveyId);

        if (survey) {

            if (survey.poster != currUser._id) {
                res.status(401);
                res.send("Unauthorised user!");
            } else {

                const newUser = res.value.body.user;

                for (const u in survey.responses_access) {
                    if (u.user == newUser) {
                        res.status(409);
                        res.send("User already has access");
                        break;
                    }
                }
                
                survey.responses_access.push(req.value.body);   //{user: "userId", edit_access: "true/false"}
                await survey.save();

                res.status(200);
                res.send("Success");
            }
        } else {
            res.status(404);
            res.send("Survey not found");
        }
    },

}