const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let question = new Schema({
  question_text: {
    type: String,
    required: true
  },
  question_description: {
    type: String
  },
  question_type: {
    type: Number,
    required: true,
    default: 1

    //type 1 : Paragraph
    //type 2 : Multiple choice
    //type 3 : Checkbox
    //type 4 : Date
    //type 5 : Time
  },
  question_options: {
    type: Array
  },
  required: {
    type: Boolean,
    default: false
  }
});

let response = new Schema({
  response_user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  response_details: [{
    _id: false,
    question_id: {
      type: Schema.Types.ObjectId
    },
    answer_text: {
      type: String
    }
  }]
});

const surveySchema = new Schema({
  poster: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  questions: {
    type: [question]
  },
  responses: {
    type: [response]
  },
  anonymous: { //if true, user id is not stored in answers
    type: Boolean,
    default: true
  },
  limit_responses: { //if true, only one response from a particular user is allowed (anonymous false is required for this)
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  responses_access: [{
    _id: false,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    edit_access: {
      type: Boolean,
      default: false
    }
  }],
  accepting_responses:{
    type: Boolean,
    default: true
  },
  active:{
    type: Boolean,
    default: true
  }
});

const Survey = mongoose.model("survey", surveySchema);
module.exports = Survey;