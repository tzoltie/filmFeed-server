const ERR = require('../utils/error')

function validateInput(email, password) {
    if(!email) {
        throw Error(ERR.EMAIL_REQUIRED)
    }
    if(!password) {
        throw Error(ERR.PASSWORD_REQUIRED)
    }
}

module.exports = {
    validateInput
}