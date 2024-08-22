const express = require('express')
const { createList, addFilm, getList, updateList, deleteList, deleteFilmFromList, getAllLists, addMultiFilmsToList} = require('../controllers/lists')
const authentication = require('../middleware/authentication')
const router = express.Router()


router.post('/', authentication, createList)
router.get('/all/:userId', authentication, getAllLists)
router.post('/film/:id', authentication, addFilm)
router.get('/list/:id/', authentication, getList)
router.patch('/:id', authentication, updateList)
router.delete('/:id', authentication, deleteList)
router.delete('/film/:id', authentication, deleteFilmFromList)
router.post('/newList', authentication, addMultiFilmsToList)

module.exports = router