module.exports = function() {
    global.log = console.log;
    global.env = process.env;
    global.port = env.PORT || 8080;
    global.host = env.HOST || '0.0.0.0';
    global.errorMessageFor = require('../services/error-handler');
    log(`Application is running in ${env.NODE_ENV} mode`);
}