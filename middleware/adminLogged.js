module.exports = (req, res, next) => {
  if (req.session?.admin?.username) {
    next();
  } else {
    res.redirect("/login");
  }
};
