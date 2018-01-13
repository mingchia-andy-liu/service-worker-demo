// return keys based on the dev/prod
if (process.env.NODE_ENV === 'production') {
    // prod
    module.exports = require('./prod')
} else {
    // dev
    module.exports = require('./dev')
}

/*
* Template object in the exported object
*    {
*        cookieKey: 'SOME_SECRET_KEY_HERE'
*    }
*/