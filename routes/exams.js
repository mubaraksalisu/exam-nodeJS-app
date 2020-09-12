const _ = require("lodash");
const { Exam, validate } = require("../models/exam");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", async (req, res) => {
  const exam = await Exam.find()
    .populate({
      path: "course",
      select: "name lecturer",
    })
    .sort("date");
  res.send(exam);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const exam = new Exam(
    _.pick(req.body, ["title", "course", "startTime", "stopTime", "date"])
  );
  await exam.save();

  res.send(exam);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const exam = await Exam.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ["title", "course", "startTime", "stopTime", "date"]),
    { new: true }
  );

  if (!exam) return res.status(404).send("Exam withe given id was not found");

  res.send(exam);
});

router.delete("/:id", async (req, res) => {
  const exam = await Exam.findByIdAndRemove(req.params.id);

  if (!exam) return res.status(404).send("Exam withe given id was not found");

  res.send(exam);
});

router.get("/:id", async (req, res) => {
  const exam = await Exam.findById(req.params.id).populate({
    path: "course",
    select: "name -_id",
  });
  if (!exam) return res.status(404).send("No exam with the given ID");

  res.send(exam);
});
