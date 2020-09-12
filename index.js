const Joi = require("joi");
const config = require("config");
Joi.ObjectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const questions = require("./routes/questions");
const exams = require("./routes/exams");
const users = require("./routes/users");
const auth = require("./routes/auth");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/exam-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected Successfully..."))
  .catch((err) =>
    console.error("Something was wrong connecting to the database...", err)
  );

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/courses", courses);
app.use("/api/questions", questions);
app.use("/api/exams", exams);
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
