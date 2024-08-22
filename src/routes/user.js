const express = require('express')
const router = express.Router()
const { create, getUser } = require('../controllers/user.js')
const authentication = require('../middleware/authentication.js')

router.post('/register', create)
router.get('/:id', authentication, getUser)
router.patch('/update/:id', authentication)


module.exports = router