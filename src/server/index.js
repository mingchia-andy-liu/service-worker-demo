const ROOT_DIR = `${__dirname}/../..`

//node module dependency
const express = require('express')
const app = express()
const path = require('path')
const cookieSession = require('cookie-session')
const morgan = require('morgan')
const passport = require('passport')
const bodyParser  = require('body-parser')
const keys = require('./config/keys')

const PORT = process.env.PORT || 9999

//middleware
app.use(
    cookieSession({
        maxAge: 60 * 60 * 1000,   // in ms, 1 hour
        keys: [keys.cookieKey]
    })
)
app.use(bodyParser.json())
app.use(morgan('combined'))

if (process.env.NODE_ENV !== 'production') {
    // Hot reload in development
    require('./handlers/webpack')(app)
}

// Serve static content
app.use('/', express.static(`${ROOT_DIR}/src/public`))

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`[ OK ] App is listening on port: ${PORT} 👂`)
    console.log(`http://localhost:${PORT}`)
})
