const express = require('express')
const cors = require('cors')
const app = express()
const userRouter = require('./routes/user.js')
const loginRouter = require('./routes/auth.js')
const listRouter = require('./routes/lists.js')

app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/login', loginRouter)
app.use('/lists', listRouter)


module.exports = app