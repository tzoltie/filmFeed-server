const { createUser } = require('../domain/user')
const { JWT_SECRET, JWT_EXPIRY } = require('../utils/config')
const { dataResponse } = require('../utils/responses')
const { validateInput } = require('../utils/validateUserInput')
const jwt = require('jsonwebtoken')

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

module.exports = {
    create
}