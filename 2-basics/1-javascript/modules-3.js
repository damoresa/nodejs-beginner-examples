'use strict';

// DISCLAIMER: These scripts do not work as the
// imported modules do not exist. Their purpose
// is to exemplify module import/export and usage.

// Sample module B
const CONSTANTS = require('./constants');

const generateTrace = (message) => {
    return {
        loglevel: CONSTANTS.LOG_LEVEL,
        message,
        timestamp: Date.now()
    };
};

// You can export an anonymous object
module.exports = {
    generateTrace
};
