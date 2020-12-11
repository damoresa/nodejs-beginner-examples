'use strict';

// DISCLAIMER: These scripts do not work as the
// imported modules do not exist. Their purpose
// is to exemplify module import/export and usage.

// Sample module A
const initialize = () => {
    return {
        name: 'Pedro'
    };
};

class SampleService {
    constructor() {
        this._state = initialize();
    }
}

// You can export an object instance
module.exports = new SampleService();
