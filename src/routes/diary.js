const express = require('express')
const authentication = require('../middleware/authentication')
const { addFilmToDiary } = require('../controllers/diary')
const router = express.Router()

router.post('/:id', authentication, addFilmToDiary)

module.exports = router