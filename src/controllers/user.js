const { createUser, getUserById, addProfilePicDb } = require('../domain/user')
const { JWT_SECRET, JWT_EXPIRY } = require('../utils/config')
const { dataResponse } = require('../utils/responses')
const { validateInput } = require('../utils/validateUserInput')
const jwt = require('jsonwebtoken')
const ERR = require('../utils/error')

const create = async (req, res) => {
    const {
        email,
        password,
        username,
        firstName
    } = req.body
    try {
        validateInput(email, password, username, firstName)
    } catch(e) {
        return dataResponse(res, 400, { error: e.message})
    }
    const createdUser = await createUser(email, password, username, firstName)
    delete createdUser.passwordHash
    const token = jwt.sign({ sub: createdUser.id }, JWT_SECRET, { expiresIn: JWT_EXPIRY })

    return dataResponse(res, 201, { token: token, user: createdUser })
}

const getUser = async (req, res) => {
    const requestUserId = Number(req.params.id)

    try {
        const found = await getUserById(requestUserId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.USER_NOT_FOUND })
        }
        delete found.passwordHash
        return dataResponse(res, 200, { user: found })
    } catch(e) {
        return dataResponse(res, 500, { error: ERR.SOMETHING_WENT_WRONG })
    }
}

const updateUserProfile = async (req, res) => {
    const userId = Number(req.user.id)
    const requestUserId = Number(req.params.id)
    const {
        profileUrl,
        username
    } = req.body

    try {
        if(requestUserId !== userId) {
            return dataResponse(res, 403, { error: ERR.REQUEST_DENIED })
        }
        const found = await getUserById(requestUserId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.USER_NOT_FOUND })
        }
        const updatedUserInfo = await updateUserProfile(requestUserId, profileUrl, username)
        return dataResponse(res, 200, { user: updatedUserInfo })
    } catch(e) {
        return dataResponse(res, 500, { error: ERR.SOMETHING_WENT_WRONG })
    }
}

const addProfilePic = async (req, res) => {
    const userId = Number(req.user.id)
    const requestUserId = Number(req.params.id)
    const { profileUrl } = req.body
    try {
        if(userId !== requestUserId) {
            return dataResponse(res, 403, { error: ERR.REQUEST_DENIED })
        }
        const found = await getUserById(userId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.USER_NOT_FOUND })
        }
        const updatedUser = await addProfilePicDb(userId, profileUrl)
        return dataResponse(res, 200, {user: updatedUser})
    } catch(e) {
        console.log(e)
        return dataResponse(res, 500, { error: e.message })
    }
}

module.exports = {
    create,
    getUser,
    addProfilePic
}