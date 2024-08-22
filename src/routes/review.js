const express = require('express')
const { createReview, updateReview, getAllFilmReviewByFilmId, getAllReviewsByUserId, getReviews } = require('../controllers/review')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/:id', authentication, createReview)
router.patch('/film/:id/review', authentication, updateReview)
router.get('/film/:id', authentication, getAllFilmReviewByFilmId)
router.get('/user', authentication, getAllReviewsByUserId)
router.get('/', authentication, getReviews)

module.exports = router