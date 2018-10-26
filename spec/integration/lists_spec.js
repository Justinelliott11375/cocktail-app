const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";

const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const User = require("../../src/db/models").User;

describe("routes : lists", () => {

  beforeEach((done) => {
    this.list;

    sequelize.sync({force: true}).then((res) => {

      List.create({
        title: "Classic Cocktails",
        description: "A lot of old drinks"
      })
      .then((list) => {
        this.list = list;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
  describe("admin user performing CRUD actions for List", () => {

    beforeEach((done) => {
      User.create({
        email: "admin@example.com",
        password: "123456"
      })
      .then((user) => {
        request.get({
          url: "http://localhost:3000/auth/fake",
          form: { 
            userId: user.id,
            email: user.email
          }
        },
          (err, res, body) => {
            done();
          }
        );
      });
    });
    
    describe("GET /lists", () => {
      it("should return a status code 200 and all lists", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Lists");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });
    describe("GET /lists/new", () => {
      it("should render a new list form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New List");
          done();
        });
      });
    });
    describe("POST /lists/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };
      it("should create a new list and redirect", (done) => {
        request.post(options, (err, res, body) => {
          List.findOne({where: {title: "blink-182 songs"}})
          .then((list) => {
            expect(res.statusCode).toBe(303);
            expect(list.title).toBe("blink-182 songs");
            expect(list.description).toBe("What's your favorite blink-182 song?");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });
    });
    describe("GET /lists/:id", () => {
      it("should render a view with the selected list", (done) => {
        request.get(`${base}${this.list.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });
    describe("POST /lists/:id/destroy", () => {
      it("should delete the list with the associated ID", (done) => {
        List.all()
        .then((lists) => {
          const topicCountBeforeDelete = lists.length;
          expect(topicCountBeforeDelete).toBe(1);
          request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
            List.all()
            .then((lists) => {
              expect(err).toBeNull();
              expect(lists.length).toBe(topicCountBeforeDelete - 1);
              done();
            });
          });
        });
      });
    });
    describe("GET /lists/:id/edit", () => {
      it("should render a view with an edit list form", (done) => {
        request.get(`${base}${this.list.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit List");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });
    describe("POST /lists/:id/update", () => {
      it("should update the list with the given values", (done) => {
        const options = {
          url: `${base}${this.list.id}/update`,
          form: {
            title: "JavaScript Frameworks",
            description: "There are a lot of them"
          }
        };
        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          List.findOne({
            where: { id: this.list.id }
          })
          .then((list) => {
            expect(list.title).toBe("JavaScript Frameworks");
            done();
          });
        });
      });
    });
  });
  describe("member user performing CRUD actions for List", () => {

    beforeEach((done) => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          role: "member"
        }
      },
        (err, res, body) => {
          done();
        }
      );
    });

    describe("GET /lists", () => {
      it("should return a status code 200 and all lists", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Lists");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });
    describe("GET /lists/new", () => {
      it("should render a new list form, but redirect to lists view", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Lists");
          done();
        });
      });
    });
    describe("POST /lists/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };
      it("should create a new list", (done) => {
        request.post(options, (err, res, body) => {
          List.findOne({where: {title: "blink-182 songs"}})
          .then((list) => {
            expect(list).not.toBeNull();
            expect(list.title).toBe("blink-182 songs"); 
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });
    });
    describe("GET /lists/:id", () => {
      it("should render a view with the selected list", (done) => {
        request.get(`${base}${this.list.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });
    describe("POST /lists/:id/destroy", () => {
      it("should NOT delete the list with the associated ID", (done) => {
        List.all()
        .then((lists) => {
          const topicCountBeforeDelete = lists.length;
          expect(topicCountBeforeDelete).toBe(1);
          request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
            List.all()
            .then((lists) => {
              expect(lists.length).toBe(topicCountBeforeDelete);
              done();
            });
          });
        });
      });
    });
    describe("GET /lists/:id/edit", () => {
      it("should NOT render a view with an edit list form", (done) => {
        request.get(`${base}${this.list.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).not.toContain("Edit List");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
    });
    describe("POST /lists/:id/update", () => {
      it("should NOT update the list with the given values", (done) => {
        const options = {
          url: `${base}${this.list.id}/update`,
          form: {
            title: "JavaScript Frameworks",
            description: "There are a lot of them"
          }
        };
        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          List.findOne({
            where: { id: this.list.id }
          })
          .then((list) => {
            expect(list.title).toBe("JS Frameworks"); 
            done();
          });
        });
      });
    });
  });
});