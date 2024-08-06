const ERR = require('../utils/error')

function validateInput(email, password, username, firstName) {
    if(!email) {
        throw Error(ERR.EMAIL_REQUIRED)
    }
    if(!password) {
        throw Error(ERR.PASSWORD_REQUIRED)
    }
    if(!username || !firstName) {
        throw Error(ERR.INCOMPLETE_REGISTER)
    }
}

module.exports = {
    validateInput
}