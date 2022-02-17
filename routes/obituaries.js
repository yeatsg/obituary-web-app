const router = require("express").Router();
const floridaManStatus = require("../middleware/floridaManStatus");
const bcrypt = require("bcryptjs");
const Obit = require("../models/Obit.model");

/* GET obituary form */
router.get("/create", (req, res) => {
  res.render("obituaries/create");
});

router.post("/create", floridaManStatus, (req, res, next) => {
  Obit.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    causeOfDeath: req.body.causeOfDeath,
    floridaMan: req.body.floridaMan,
    floridaManSlug: req.body.floridaManSlug,
    photoUrl: req.body.photoUrl,
  })
    .then((newObit) => {
      console.log("New obit created,", newObit);
      res.redirect("/:id");
    })
    .catch((err) => {
      console.log("err", err);
    });
});

router.get("/:id", (req, res) => {
  Obit.findById(req.params.id)
    .then((results) => {
      res.render("obituaries/new-obit", {
        displayObit: results,
      });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

// GET all obits on board

router.get("/board", (req, res) => {
  Obit.find()
    .then((results) => {
      res.render("obituaries/board", {
        allObits: results,
      });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
