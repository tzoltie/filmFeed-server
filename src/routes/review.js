const express = require('express')
const { createReview } = require('../controllers/review')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/:id', authentication, createReview)

module.exports = router