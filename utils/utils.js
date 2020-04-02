exports.capitalizeFirstLetter = function(str) {
    if (typeof str !== 'string') {
        throw Error('Argument is not of type string');
    }
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
}

exports.objectsAreEqual = function(a, b) {
    const aProperties = Object.getOwnPropertyNames(a);
    const bProperties = Object.getOwnPropertyNames(b);
    if (aProperties.length !== bProperties.length) {
        return false;
    }
    for (let i = 0; i < aProperties.length; i++) {
        const property = aProperties[i];
        if (a[property] != b[property]) {
            return false;
        }
    }
    return true;
}

exports.normalize = function(obj) {
    Object.entries(obj).forEach(function([key, value]) {
        if (!value || value === '') obj[key] = null;
    });
    return obj;
}
