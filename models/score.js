const mongoose = require("mongoose");
const Joi = require("joi");

const scoreSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  examQuestionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Score = mongoose.model("Score", scoreSchema);

function validateScore(score) {
  const schema = Joi.object({
    studentId: Joi.objectId().required(),
    courseId: Joi.objectId().required(),
    examId: Joi.objectId().required(),
    examQuestionId: Joi.objectId().required(),
    score: Joi.number().required().min(0),
  });
  return schema.validate(score);
}

exports.Score = Score;
exports.validate = validateScore;
