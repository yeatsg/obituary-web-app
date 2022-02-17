const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Obit = require("../models/Admin.model");

// GET admin signup form

router.get("/signup", (req, res) => {
  res.render("admin/signup");
});

router.post("/signup", (req, res) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPass = bcrypt.hashSync(req.body.password, salt);
  Admin.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
  })
    .then((results) => {
      console.log("New Admin was created", results);
      req.session.admin = results;
      globalUser = req.session.admin;
      console.log("Req.session.admin", req.session.admin);
      console.log("Global User", globalUser);
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.post("/login", (req, res) => {
  Admin.findOne({ username: req.body.username })
    .then((foundUser) => {
      if (!foundUser) {
        errorMessage = "User can not be found";
        return res.render("login", { errorMessage });
      }
      const match = bcrypt.compareSync(req.body.password, foundUser.password);
      if (!match) {
        errorMessage = "password incorrect";
        return res.render("login", { errorMessage });
      } else {
        console.log("Admin was logged in", foundUser);
        req.session.admin = foundUser;
        globalUser = req.session.admin;
        console.log("req.session.admin =", req.session.admin);
        console.log("Global user", globalUser);
        res.redirect("/main");
      }
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

// GET logout //

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
