// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

const bcrypt = require("bcryptjs");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "Obituary Generator";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 600000,
      // secure: true
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/signup-test",
      ttl: 600000,
    }),
  })
);

app.use((req, res, next) => {
  if (req.session.admin) {
    Admin.findById(req.session.admin._id).then((admin) => {
      req.app.locals.globaluser = admin;
      next();
    });
  } else {
    next();
  }
});

const index = require("./routes/index");
app.use("/", index);
const admin = require("./routes/admin");
app.use("/admin", admin);
const obituaries = require("./routes/obituaries");
app.use("/obituaries", obituaries);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
