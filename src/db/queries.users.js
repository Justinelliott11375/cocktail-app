const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {
    createUser(newUser, callback) {
        console.log('queries create called');
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
            email: newUser.email,
            password: hashedPassword
        })
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    }

    
}