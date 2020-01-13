const { getMongoURI, getMongoOptions } = require('./mongo.functions');

module.exports = Object.freeze({
    URI: getMongoURI(),
    OPTIONS: getMongoOptions()
});
