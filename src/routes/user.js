const { create } = require('../controllers/user')

const router = require('express').Router()

router.post('/', create())


module.exports = router