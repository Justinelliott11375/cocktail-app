const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;


describe("User", () => {

    beforeEach((done) => {

        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe("#create()", () => {

    it("should create a User object with a valid email and password", (done) => {
        User.create({
            email: "user@example.com",
            password: "1234567890"
        })
        .then((user) => {
            expect(user.email).toBe("user@example.com");
            expect(user.id).toBe(1);
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe("should create a user then sign in as that user", () => {

        it("should create a User object with a valid email and password", (done) => {
            User.create({
                email: "user@example.com",
                password: "1234567890"
            })
            .then((user) => {

                it("should create a new user with valid values and redirect", (done) => {
                    const option = {
                        url: `${base}/sign_in`,
                        form: {
                            email: "user@example.com",
                            password: "1234567890"
                        }
                    }
        
                    request.post(option, (err, res, body) => {
        
                        User.findOne({where: {email: "user@example.com"}})
                        .then((user) => {
                            console.log(user.username);
                            expect(user).not.toBeNull();
                            expect(user.email).toBe("user@example.com");
                            expect(user.username).toBe("exampleUsername")
                            expect(user.id).toBe(1);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                    })
                })

                expect(user.email).toBe("user@example.com");
                expect(user.id).toBe(1);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
    

    it("should not create a user with invalid email or password", (done) => {
        User.create({
            email: "invalid",
            password: "1234567890"
        })
        .then((user) => {
            // should throw error, expect statements in .catch
            done();
        })
        .catch((err) => {
            expect(err.message).toContain("Validation error: must be a valid email");
            done();
        });
    });

    it("should not create a user with an email already taken", (done) => {

        User.create({
            email: "user@example.com",
            password: "1234567890"
        })
        .then((user) => {

            User.create({
                email: "user@example.com",
                password: "password"
            })
            .then((user) => {

                // should throw error, expect statements in .catch
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Validation error");
                done();
            });
                done();
        })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
});
