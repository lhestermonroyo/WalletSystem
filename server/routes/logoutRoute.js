router.post("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You are now logged out.");
  res.redirect("/");
});
