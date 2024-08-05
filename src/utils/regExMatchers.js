const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

module.exports = {
    emailRegEx,
    passwordRegEx
}