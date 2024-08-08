const express = require('express')
const { createReview, updateReview, getAllFilmReviewByFilmId } = require('../controllers/review')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/:id', authentication, createReview)
router.patch('/film/:id', authentication, updateReview)
router.get('/film/:id', authentication, getAllFilmReviewByFilmId)

module.exports = router