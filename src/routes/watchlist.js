const express = require('express')
const { getWatchlist, addFilmToWatchlistById } = require('../controllers/watchlist')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.get('/:id', authentication, getWatchlist)
router.post('/:id', authentication, addFilmToWatchlistById)

module.exports = router