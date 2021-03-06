const express = require("express");
const router = express.Router();
const validation = require("./validation");
const User = require('../../src/db/models').User;
const userController = require("../controllers/userController");

router.get("/users/register", userController.register);
router.get("/users/sign_in", userController.signInForm);
router.get("/users/sign_out", userController.signOut);
//router.get("/users/:id", userController.show)
router.post("/users", validation.validateUsers, userController.create);
router.post("/users/sign_in", validation.validateUserSignIn, userController.signIn);



module.exports = router;