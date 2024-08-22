const express = require('express')
const authentication = require('../middleware/authentication')
const { addFilmToDiary, getUsersDiary } = require('../controllers/diary')
const router = express.Router()

router.post('/:id', authentication, addFilmToDiary)
router.get('/', authentication, getUsersDiary)

module.exports = router