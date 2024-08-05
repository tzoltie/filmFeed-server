const { createUser } = require('../domain/user')
const dbClient = require('../utils/dbClient')
const { dataResponse } = require('../utils/responses')
const validation = require('../utils/validateUserInput')

const create = async (req, res) => {
    try {
        validation.validateInput(req.body.email, req.body.password)
    } catch(e) {
        return dataResponse(res, 400, { error: e.message})
    }
    const createdUser = await createUser(req.body.email, req.body.password)

    return dataResponse(res, 201, { user: createdUser })
}

module.exports = {
    create
}