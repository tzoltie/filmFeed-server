const dbClient = require("../utils/dbClient");
const bcrypt = require('bcrypt')

const createUser = async (email, password, username, firstName) => await dbClient.user.create({
    data: {
        email: email,
        passwordHash: await bcrypt.hash(password, 8),
        username: username,
        profile: {
            create: {
                name: firstName
            }
        }
    },
    include: {
        profile: true
    }
})

const getUserByUsername = async (username) => await dbClient.user.findUnique({
    where: {
        username: username
    },
    include: {
        profile: true
    }
})

const getUserByEmail = async (email) => await dbClient.user.findUnique({
    where: {
        email: email
    },
    include: {
        profile: true
    }
})

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail
}