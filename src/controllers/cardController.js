const cardQueries = require("../db/queries.cards");
//const Authorizer = require("../policies/card");

module.exports = {
    new(req, res, next) {
           console.log("cardController new called");
            res.render("cards/new", { listId: req.params.listId });
    },

    create(req, res, next) {
			let newCard = {
				name: req.body.name,
				recipe: req.body.recipe,
				listId: req.params.listId,
			};
			cardQueries.addCard(newCard, (err, card) => {
				if (err) {
					res.redirect(500, "/cards/new");
				} else {
					res.redirect(303, `/lists/${newCard.listId}/cards/${card.id}`);
				}
			});
    },

    show(req, res, next) {
        cardQueries.getCard(req.params.id, (err, card) => {
            if(err || card == null) {
                res.redirect(404, "/");
            } else {
                res.render("cards/show", {card});
            }
        });
    },

    destroy(req, res, next) {
        cardQueries.deleteCard(req, (err, deletedRecordsCount) => {
            if(err) {
                res.redirect(500, `/lists/${req.params.listId}/cards/${req.params.id}`)
            } else {
                res.redirect(303, `/lists/${req.params.listId}`)
            }
        });
    },

    edit(req, res, next){
        cardQueries.getCard(req.params.id, (err, card) => {
            if(err || card == null){
                res.redirect(404, "/");
            } else {
                res.render("cards/edit", {card});
            }
        });
    },

    update(req, res, next){
        cardQueries.updateCard(req, req.body, (err, card) => {
            if(err || card == null){
                res.redirect(404, `/lists/${req.params.listId}/cards/${req.params.id}/edit`);
            } else {
                res.redirect(`/lists/${req.params.listId}/cards/${req.params.id}`);
            }
        });
    }

}