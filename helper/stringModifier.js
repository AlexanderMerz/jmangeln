exports.capitalizeFirstLetter = str => {
    if (typeof str !== 'string') {
        throw Error('Argument is not of type string');
    }
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
}