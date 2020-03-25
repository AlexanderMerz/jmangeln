function getMongoURI() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DB } = env;
    if ([MONGO_USER, MONGO_PASSWORD, MONGO_DB].some(variable => variable == null))
        throw Error('Undefined environment variable(s)');
    return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}`+
        `@cluster0-uhbcz.mongodb.net/${MONGO_DB}?retryWrites=true`;
}
function getMongoOptions() {
    return {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
}
module.exports = {
    getMongoURI,
    getMongoOptions
}
