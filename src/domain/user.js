const dbClient = require("../utils/dbClient");
const bcrypt = require('bcrypt')

const createUser = async (email, password) => await dbClient.user.create({
    data: {
        email: email,
        passwordHash: await bcrypt.hash(password, 8)
    }
})

module.exports = {
    createUser
}