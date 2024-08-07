const { dataResponse } = require("../utils/responses")
const ERR = require('../utils/error')
const jwt = require('jsonwebtoken')
const dbClient = require("../utils/dbClient")

const authentication = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    try {
        const token = authHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const foundUser = await dbClient.user.findUnique({
            where: {
                id: decodedToken.sub
            }
        })
        if(!foundUser) {
            dataResponse(res, 404, { error: ERR.USER_NOT_FOUND})
        }
        req.user = foundUser
    } catch (e) {
        console.log('error:', e)
        return dataResponse(res, 401, { error: ERR.INVALID_TOKEN})
    }
    next()
}

module.exports = authentication