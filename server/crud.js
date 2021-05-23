const {User, Status} = require("./db.js");

async function createUser (name) {
    const user = new User ({name});
    return await user.save();
}

module.exports = {
    createUser
}