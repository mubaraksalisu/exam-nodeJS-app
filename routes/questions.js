const _ = require("lodash");
const { Question, validate } = require("../models/question");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const questions = await Question.find().populate("exam").sort("date");
  res.send(questions);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = new Question(
    _.pick(req.body, [
      "exam",
      "question",
      "optionA",
      "optionB",
      "optionC",
      "optionD",
      "answer",
      "score",
    ])
  );
  await question.save();

  res.send(question);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = await Question.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, [
      "exam",
      "question",
      "optionA",
      "optionB",
      "optionC",
      "optionD",
      "answer",
      "score",
    ]),
    { new: true }
  );

  if (!question)
    return res.status(404).send("Question withe given id was not found");

  res.send(question);
});

router.delete("/:id", async (req, res) => {
  const question = await Question.findByIdAndRemove(req.params.id);

  if (!question)
    return res.status(404).send("Question withe given id was not found");

  res.send(question);
});

router.get("/:id", async (req, res) => {
  const question = await Question.findById(req.params.id).populate("exam");
  if (!question) return res.status(404).send("No question with the given ID");

  res.send(question);
});

module.exports = router;
