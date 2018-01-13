module.exports = (app) => {
    const webpack = require('webpack')
    const webpackConfig = require(`${__dirname}/../../../config/webpack.config.js`)
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const compiler = webpack(webpackConfig)

    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        stats: {
            colors: true
        }
    }))

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr'
    }))
}
