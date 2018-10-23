const User = require("../../src/db/models").User;

module.exports = {

    validateUsers(req, res, next) {
        if(req.method === "POST") {
            console.log("validation validateUsers called, body: " + req.body);
            req.checkBody("email", "must be valid").isEmail();
            req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6})
            req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
        }

        const errors = req.validationErrors();
        
        if (errors) {
            req.flash("error", errors);
            return res.redirect(req.headers.referer);
        }   else {
            return next();
        }
    },

    validateUserSignIn(req, res, next) {
        console.log("validate sign in called, body: " + req.body);
        if(req.method === "POST") {
            req.checkBody("email", "must be a valid email").isEmail();
            req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6})
        }

        const errors = req.validationErrors();
        
        if (errors) {
            req.flash("error", errors);
            return res.redirect(req.headers.referer);
        }   else {
            return next();
        }
    }
}