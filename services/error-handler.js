module.exports = function(error) {
    switch (error) {
        case 'environment': {
            return 'Application is running in an invalid environment.'
                + ' Please set NODE_ENV to either development or production';
        }
        default: return 'An unexpected error has occured';
    }
};
