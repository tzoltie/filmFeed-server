const express = require('express')
const { createList, addFilm, getList, updateList, deleteList} = require('../controllers/lists')
const authentication = require('../middleware/authentication')
const router = express.Router()


router.post('/', authentication, createList)
router.post('/:id', authentication, addFilm)
router.get('/:id', authentication, getList)
router.patch('/:id', authentication, updateList)
router.delete('/:id', authentication, deleteList)

module.exports = router