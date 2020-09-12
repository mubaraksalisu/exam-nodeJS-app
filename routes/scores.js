const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { Score, validate } = require("../models/score");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let score = await Score.find({
    studentId: req.body.studentId,
    courseId: req.body.courseId,
    examId: req.body.examId,
    examQuestionId: req.body.examQuestionId,
  });
  if (score)
    return res.status(400).send("Question already answered by student");

  score = new Score(
    _.pick(req.body, [
      "studentId",
      "courseId",
      "examId",
      "examQuestionId",
      "score",
    ])
  );
  await score.save();

  res.send(score);
});
