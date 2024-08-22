const express = require('express')
const authentication = require('../middleware/authentication')
const { addUsersFavouriteFilms, updateUsersFavouriteFilms, getUsersFavouriteFilms } = require('../controllers/usersFavouriteFilms')
const router = express.Router()

router.post('/:id', authentication, addUsersFavouriteFilms)
router.get('/:id', authentication, getUsersFavouriteFilms)
router.patch('/:id', authentication, updateUsersFavouriteFilms)

module.exports = router