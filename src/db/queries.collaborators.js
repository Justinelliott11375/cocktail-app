const Card = require("./models").Card;
const List = require("./models").List;
const User = require("./models").User;

module.exports = {

    addCreator(newCollab, callback) {
        console.log("addCreator called");
		return Collaborator.create({
            listId: newCollab.list,
            userId: newCollab.user,
            role: newCollab.role
        })
			.then((collaborator) => {
				callback(null, collaborator);
			})
			.catch((err) => {
                console.log(err);
				callback(err);
			});
	},
	/*addCard(newCard, callback) {
		return Card.create(newCard)
			.then((card) => {
				callback(null, card);
			})
			.catch((err) => {
				callback(err);
			});
	},

	getCard(id, callback) {
		return Card.findById(id)
			.then((card) => {
				callback(null, card);
			})
			.catch((err) => {
				callback(err);
			});
	},

	deleteCard(req, callback) {
		return Card.findById(req.params.id)
			.then(card => {
				card.destroy().then(res => {
					callback(null, card);
				});
			})
			.catch(err => {
				callback(err);
			});
	},

	updateCard(req, updatedCard, callback) {
		return Card.findById(req.params.id).then((card) => {
			if (!card) {
				return callback("Recipe not found");
			}
				card.update(updatedCard, {
						fields: Object.keys(updatedCard),
					})
					.then(() => {
						callback(null, card);
					})
					.catch((err) => {
						callback(err);
					});
			
		});
	},*/
};