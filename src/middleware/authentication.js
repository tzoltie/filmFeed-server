const { dataResponse } = require("../utils/responses")
const ERR = require('../utils/error')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(authHeader === undefined) {
        return dataResponse(res, 401, { error: ERR.LOGIN_REQUIRED })
    }
    const token = authHeader.split(' ')[1]
    if(token === null) {
        return dataResponse(res, 401 , { error: ERR.LOGIN_REQUIRED })
    }
    jwt.verify(token, process.env.JWT_SECRET, (e, user) => {
        if(e) {
            return dataResponse(res, 403, { error: ERR.INVALID_TOKEN})
        }
        req.user = user
    })
    next()
}

module.exports = authentication