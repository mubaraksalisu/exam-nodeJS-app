const mongoose = require("mongoose");
const Joi = require("joi");

const examSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  stopTime: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Exam = mongoose.model("Exam", examSchema);

function validateExam(exam) {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    course: Joi.ObjectId().required(),
    startTime: Joi.string().required().max(6),
    stopTime: Joi.string().required().max(6),
    date: Joi.string().required(),
  });

  return schema.validate(exam);
}

exports.Exam = Exam;
exports.validate = validateExam;
