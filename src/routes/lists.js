const express = require("express");
const router = express.Router();

const listController = require("../controllers/listController");
const validation = require("./validation");

router.get("/lists", listController.index);
router.get("/lists/new", listController.new);
router.post("/lists/create", validation.validateLists, listController.create);
router.post("/lists/:id/destroy", listController.destroy);
router.get("/lists/:id/edit", listController.edit);
router.post("/lists/:id/update", validation.validateLists, listController.update);
router.get("/lists/:id", listController.show);


module.exports = router;