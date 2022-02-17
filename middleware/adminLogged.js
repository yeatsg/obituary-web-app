module.exports = (req, res, next) => {
  if (req.session?.admin?.username) {
    next();
  } else {
    res.json("You are not logged in shit for brains. You can't edit");
  }
};
