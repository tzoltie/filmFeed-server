const express = require('express')
const cors = require('cors')
const app = express()
const userRouter = require('./routes/user.js')
const loginRouter = require('./routes/auth.js')

app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/login', loginRouter)


module.exports = app