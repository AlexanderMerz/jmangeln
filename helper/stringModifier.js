exports.capitalizeFirstLetter = str => {
    if (typeof str === 'string') {
        return str.charAt(0).toUpperCase() + str.slice(1, str.length);
    } else {
        throw Error('Argument is not of type string');
    }
}