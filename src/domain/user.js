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

const getUserById = async (id) => await dbClient.user.findUnique({
    where: {
        id: id
    },
    include: {
        profile: true,
        reviews: {
            include: {
                film: {
                    select: {
                        poster: true
                    }
                }
            }
        },
        watchlist: true,
        diary: true,
        lists: true
    }
})

const updateUserInfo = async (userId, profileUrl, username) => await dbClient.user.update({
    where: {
        id: userId
    },
    data: {
        username: username,
        profile: {
            connect: {
                user: {
                    profile: {
                        profilePic: profileUrl
                    }
                }
            }
        }
    },
    include: {
        profile: true
    }
})

const addProfilePicDb = async (userId, profileUrl) => await dbClient.profile.upsert({
    where: {
        userId: userId
    },
    update: {
        profilePic: profileUrl
    },
    create: {
        userId: userId,
        profilePic: profileUrl
    }
})

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById,
    updateUserInfo,
    addProfilePicDb
}