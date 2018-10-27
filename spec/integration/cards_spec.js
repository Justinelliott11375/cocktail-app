const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Card = require("../../src/db/models").Card;
const User = require("../../src/db/models").User;

describe("routes : cards", () => {
	beforeEach(done => {
		this.list;
		this.card;
		this.user;

		sequelize.sync({ force: true }).then((res) => {
			User.create({
				email: "email@email.com",
                password: "password",
			}).then((user) => {
				this.user = user;

				List.create(
					{
						title: "Classic Cocktails",
						description: "Prohibition era libations.",
						cards: [{
								name: "Martini",
								recipe: "Gin, Vermouth, etc",
						}],
					},
					{
						include: {
							model: Card,
							as: "cards",
						},
					},
				).then((list) => {
					this.list = list;
					this.card = list.cards[0];
					done();
				});
			});
		});
	});

	describe("User performing CRUD actions for cards", () => {

		describe("GET /lists/:listId/cards/new", () => {
			it("should render a new post form", done => {
				request.get(`${base}/${this.list.id}/cards/new`, (err, res, body) => {
					expect(err).toBeNull();
					expect(body).toContain("New Recipe");
					done();
				});
			});
		});

		describe("POST /lists/:listId/cards/create", () => {
			it("should create a new post and redirect", done => {
				const options = {
					url: `${base}/${this.list.id}/cards/create`,
					form: {
						name: "Tom Collins",
						recipe: "Gin, lemon, sugar, soda, etc"
					},
				};
				request.post(options, (err, res, body) => {
					Card.findOne({ where: { name: "Tom Collins" } })
						.then((card) => {
							expect(card).not.toBeNull();
							expect(card.name).toBe("Tom Collins");
							expect(card.recipe).toBe("Gin, lemon, sugar, soda, etc");
							expect(card.listId).not.toBeNull();
							done();
						})
						.catch(err => {
							console.log(err);
							done();
						});
				});
			});

			it("should not create a new recipe card that fails validations", done => {
				const options = {
					url: `${base}/${this.list.id}/cards/create`,
					form: {
						name: "a",
						recipe: "b",
					},
				};

				request.post(options, (err, res, body) => {
					Card.findOne({ where: { name: "a" } })
						.then(card => {
							expect(card).toBeNull();
							done();
						})
						.catch(err => {
							console.log(err);
							done();
						});
				});
			});
		});

		describe("GET /lists/:listId/cards/:id", () => {
			it("should render a view with the selected recipe card", done => {
				request.get(`${base}/${this.list.id}/cards/${this.card.id}`, (err, res, body) => {
					expect(err).toBeNull();
					expect(body).toContain("Martini");
					done();
				});
			});
		});

		describe("POST /lists/listId/cards/:id/destroy", () => {
			it("should delete the post with the associated Id", done => {
				Card.all().then(cards => {
					const cardCountBeforeDelete = cards.length;

					expect(cardCountBeforeDelete).toBe(1);

					request.post(`${base}/${this.list.id}/cards/${this.post.id}/destroy`, (err, res, body) => {
						Card.all().then(card => {
							expect(card.length).toBe(cardCountBeforeDelete-1);
							done();
						});
					});
				});
			});

			describe("POST /lists/listId/cards/:id/edit", () => {
				it("should render a view of the edit recipe card form", done => {
					request.get(`${base}/${this.list.id}/cards/${this.card.id}/edit`, (err, res, body) => {
						expect(body).toContain("Edit Recipe");
						done();
					});
				});
			});
		});
	});
});