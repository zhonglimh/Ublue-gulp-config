// include package
const argv = require('minimist')

// include default config
const config = require('./gulp.config')

/* = Environmental Witch
-------------------------------------------------------------- */
const options = argv(process.argv.slice(2))
if (options.test === true || options.build === true) {
    config.isDev = false
    config.sourceMap = false
    config.sassStyle = 'compressed'
}
if (options.test === true) {
    config.env = 'test'
    config.pathsDev = config.pathsTest
}
if (options.build === true) {
    config.env = 'production'
    config.pathsDev = config.pathsBuild
}

module.exports = config
