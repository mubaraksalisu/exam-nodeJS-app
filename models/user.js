const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    role: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    fullName: Joi.string().min(5).max(50).required(),
    role: Joi.string().min(5).max(50).required(),
    address: Joi.string().required().min(5).max(255),
    phone: Joi.string().required().min(5).max(15),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
