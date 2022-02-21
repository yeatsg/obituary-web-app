const router = require("express").Router();
const checkboxCheck = require("../middleware/checkboxCheck")
const floridaManStatus = require("../middleware/floridaManStatus");
const adminLogged = require("../middleware/adminLogged");
const bcrypt = require("bcryptjs");
const Obit = require("../models/Obit.model");

/* GET obituary form */
router.get("/create", (req, res) => {
  res.render("obituaries/create");
});

router.post("/create", checkboxCheck, floridaManStatus, (req, res, next) => {
  Obit.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    causeOfDeath: req.body.causeOfDeath,
    floridaMan: req.body.floridaMan,
    floridaManSlug: req.body.floridaManSlug,
    photoUrl: req.body.photoUrl,
    accomplishments: req.body.accomplishments,
  })
    .then((newObit) => {
      console.log("New obit created,", newObit);
      res.redirect(`/obituaries/${newObit._id}`);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

// GET all obits on board

router.get("/board", (req, res) => {
  Obit.find()
    .then((results) => {
      res.render("obituaries/board", {
        allObits: results
      });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/:id", (req, res) => {
  Obit.findById(req.params.id)
    .then((results) => {
      console.log("found obituary", req.params_id)
      res.render("obituaries/new-obit", {
        displayObit: results,
      });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/:id/edit", adminLogged, (req, res) => {
  Obit.findById(req.params.id)
    .then((results) => {
      console.log("Obituary that has been found", results)
      res.render("obituaries/edit", {
        displayObit: results,
      });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/:id/edit", adminLogged, (req, res) => {
  Obit.findByIdAndUpdate(req.params, req.body)
    .then((results) => {
      res.redirect("/obituaries/board");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/:id/delete", adminLogged, (req, res) => {
  Obit.findByIdAndRemove(req.params.id)
    .then((results) => {
      console.log("This is the article that has been deleted", results);
      res.redirect("/obituaries/board");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
