const express = require("express");
const router = express.Router();

const cardController = require("../controllers/cardController");
const validation = require("./validation");
//const helper = require("../auth/helpers");

router.get("/lists/:listId/cards/new", cardController.new);
router.post("/lists/:listId/cards/create", validation.validateCards, cardController.create);
router.get("/lists/:listId/cards/:id", cardController.show);
router.post("/lists/:listId/cards/:id/destroy", cardController.destroy);
router.get("/lists/:listId/cards/:id/edit", cardController.edit);
router.post("/lists/:listId/cards/:id/update", validation.validateCards, cardController.update);

module.exports = router;