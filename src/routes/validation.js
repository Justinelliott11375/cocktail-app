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
        console.log("validate sign in called, body: " + req.body.password);
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
    },

    validateLists(req, res, next) {
        if(req.method === "POST") {
            req.checkBody("title", "must be at least 5 characters in length").isLength({min: 5});
            req.checkBody("description", "must be at least 10 characters in length").isLength({min: 10});
        }
        const errors = req.validationErrors();

        if(errors) {
            req.flash("error", errors);
            return res.redirect(303, req.headers.referer)
        } else {
            return next();
        }
    },

    validateCards(req, res, next) {
        if(req.method === "POST") {
            req.checkParams("listId", "must be valid").notEmpty().isInt();
            req.checkBody("name", "must be at least 2 characters in length").isLength({min: 2});
            req.checkBody("recipe", "must be at least 10 characters in length").isLength({min: 10});
        }
        const errors = req.validationErrors();

        if(errors) {
            req.flash("error", errors);
            return res.redirect(303, req.headers.referer)
        } else {
            return next();
        }
    },
}