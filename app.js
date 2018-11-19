const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const scooterssRouter = require("./routes/scooters");
const parkingRouter = require("../routes/parking");

const app = express();
require("dotenv").config();

mongoose
  .connect(
    `mongodb://${process.env.MONGODB_HOST}`,
    { useNewUrlParser: true }
  )
  .then(
    () => {},
    err => {
      throw new Error(err);
    }
  );
mongoose.set("useCreateIndex", true);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/scooters", scooterssRouter);
app.use("/parking", parkingRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
process.on("unhandledRejection", error => {
  console.log("Something bad happened", error);
});

module.exports = app;
