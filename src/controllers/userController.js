const userQueries = require("../db/queries.users.js");
 const passport = require("passport");

module.exports = {
  register(req, res, next){
    console.log("controller register called");
    res.render("users/register");
  },

  create(req, res, next){
    console.log('controller create called');
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        req.flash("error", err);
        res.redirect("/users/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        })
      }
    });
  },

  signInForm(req, res, next){
    console.log("controller sign in form called")
    res.render("users/sign_in");
  },

  signIn(req, res, next) {
    console.log("controller sign in called");
      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
          req.flash("notice", "Sign in failed. Please try again.")
          // *** Display message without using flash option
          // re-render the login form with a message
          return res.render("users/sign_in");
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          req.flash("notice", "You've successfully signed in!");
          return res.redirect('/');
        });
      })(req, res, next);
  },
    
  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },  
}