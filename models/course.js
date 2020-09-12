const mongoose = require("mongoose");
const Joi = require("joi");

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    lecturer: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    lecturer: Joi.string().required().min(3).max(50),
  });

  return schema.validate(course);
}

exports.Course = Course;
exports.validate = validateCourse;
