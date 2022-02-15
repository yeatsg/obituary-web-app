const router = require("express").Router();

/* GET home page */
router.get("obituaries/create", (req, res, next) => {
  res.render("../views/create-post/create");
});

module.exports = router;
