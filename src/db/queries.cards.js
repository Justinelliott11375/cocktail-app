const Card = require("./models").Card;
const List = require("./models").List;
const User = require("./models").User;
//const Authorizer = require("../policies/cards");

module.exports = {
	addCard(newCard, callback) {
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

	deletePost(req, callback) {
		return Post.findById(req.params.id)
			.then(post => {
				const authorized = new Authorizer(req.user, post).destroy();
				if (authorized) {
					post.destroy().then(res => {
						callback(null, post);
					});
				} else {
					req.flash("notice", "You are not authorized to do that.");
					callback(401);
				}
			})
			.catch(err => {
				callback(err);
			});
	},

	updatePost(req, updatedPost, callback) {
		return Post.findById(req.params.id).then((post) => {
			if (!post) {
				return callback("Post not found");
			}
			const authorized = new Authorizer(req.user, post).update();
			if (authorized) {
				post.update(updatedPost, {
						fields: Object.keys(updatedPost),
					})
					.then(() => {
						callback(null, post);
					})
					.catch((err) => {
						callback(err);
					});
			} else {
				req.flash("notice", "You are not authorized to do that.");
				callback("Forbidden");
			}
		});
	},
};