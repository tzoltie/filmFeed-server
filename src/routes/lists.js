const express = require('express')
const { createList, addFilm, getList} = require('../controllers/lists')
const authentication = require('../middleware/authentication')
const router = express.Router()


router.post('/', authentication, createList)
router.post('/:id', authentication, addFilm)
router.get('/:id', authentication, getList)

module.exports = router