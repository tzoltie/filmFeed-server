const express = require('express')
const router = express.Router()
const { create } = require('../controllers/user.js')

router.post('/register', create)


module.exports = router