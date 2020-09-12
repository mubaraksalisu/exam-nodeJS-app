const mongoose = require("mongoose");
const Joi = require("joi");

const questionSchema = mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  question: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  optionA: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  optionB: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  optionC: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  optionD: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  answer: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", questionSchema);

function validateQuestion(question) {
  const schema = Joi.object({
    exam: Joi.ObjectId.required(),
    question: Joi.string().required().minlength(5).maxlength(255),
    optionA: Joi.string().required().minlength(5).maxlength(255),
    optionB: Joi.string().required().minlength(5).maxlength(255),
    optionC: Joi.string().required().minlength(5).maxlength(255),
    optionD: Joi.string().required().minlength(5).maxlength(255),
    answer: Joi.string().required().minlength(5).maxlength(255),
    score: Joi.number().required().min(1),
  });

  return schema.validate(question);
}

exports.Question = Question;
exports.validate = validateQuestion;
