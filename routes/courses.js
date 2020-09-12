const _ = require("lodash");
const { Course, validate } = require("../models/course");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find().sort("name");
  res.send(courses);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = new Course(_.pick(req.body, ["name", "lecturer"]));
  await course.save();

  res.header("x-time", course.created_at).send(course);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ["name", "lecturer"]),
    { new: true }
  );

  if (!course)
    return res.status(404).send("Course withe given id was not found");

  res.send(course);
});

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course)
    return res.status(404).send("Course withe given id was not found");

  res.send(course);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send("No course with the given ID");

  res.send(course);
});

module.exports = router;
