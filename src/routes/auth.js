const { login } = require('../controllers/auth')


const router = require('express').Router()

router.post('/', login)

module.exports = router