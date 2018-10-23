const userQueries = require("../db/queries.users.js");
 const passport = require("passport");

module.exports = {
  signUp(req, res, next){
    console.log("controller sign up called");
    res.render("users/sign_up");
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
        res.redirect("/users/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        })
      }
    });
  },

  signInForm(req, res, next){
    console.log("controller sign in  form called")
    res.render("users/sign_in");
  },

  signIn(req, res, next) {
    console.log("controller sign in called")
    passport.authenticate("local")(req, res, function() {
      if(!req.user){
        console.log("error")
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/sign_in");
      } else {
        console.log("success");
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    })
  },
    
  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },  
}