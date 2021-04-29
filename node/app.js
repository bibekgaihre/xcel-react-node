const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");

const app = express();

mongoose.connect("mongodb://localhost:27017/exercise", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(5000, () => console.log(` server is running on port 5000`));
