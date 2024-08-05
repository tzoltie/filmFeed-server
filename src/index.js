const dotenv = require('dotenv')
const app = require('./server')
dotenv.config()
app

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server Listening on PORT:", port)
})
