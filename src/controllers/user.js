const { createUser } = require('../domain/user')
const { dataResponse } = require('../utils/responses')
const validation = require('../utils/validateUserInput')

const create = async (req, res) => {
    const {
        email,
        password,
        username,
        firstName
    } = req.body
    try {
        validation.validateInput(email, password, username, firstName)
    } catch(e) {
        return dataResponse(res, 400, { error: e.message})
    }
    const createdUser = await createUser(email, password, username, firstName)
    delete createdUser.passwordHash

    return dataResponse(res, 201, { user: createdUser })
}

module.exports = {
    create
}