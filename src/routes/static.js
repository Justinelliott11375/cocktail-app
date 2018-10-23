const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

router.get("/", staticController.index);
//router.get("/", (req, res, next) => {
  //  res.send("Welcome!");
  //});
module.exports = router;
