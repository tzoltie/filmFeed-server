const { getUserByEmail } = require("../domain/user")
const { dataResponse } = require("../utils/responses")
const bcrypt = require('bcrypt')
const ERR = require('../utils/error')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRY } = require("../utils/config")

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body

    try {
        const foundUser = await getUserByEmail(email)
        const loginValid = validateUser(password, foundUser)

        if(!loginValid) {
            return dataResponse(res, 400, { error: ERR.INVALID_LOGIN })
        }
        const userId = foundUser.id
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY })

        return dataResponse(res, 200, { token: token })
    } catch (e) {
        return dataResponse(res, 400, { error: e.message })
    }
}

const validateUser = async (password, user) => {
    if(!user) {
        return false
    }
    if(!password) {
        return false
    }

    const passwordValidation = await bcrypt.compare(password, user.passwordHash)
    if(!passwordValidation) {
        return false
    }
    return true
}

module.exports = {
    login
}