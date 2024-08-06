const express = require('express')
const { createList, addFilmtoList, getList } = require('../controllers/lists')
const authentication = require('../middleware/authentication')
const { updateList } = require('../domain/lists')
const router = express.Router()


router.post('/', authentication, createList)
router.post('/:id', authentication, addFilmtoList)
router.get('/:id', authentication, getList)
router.patch('/:id', authentication, updateList)

module.exports = router