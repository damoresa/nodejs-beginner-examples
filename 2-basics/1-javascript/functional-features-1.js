'use strict';

// Immutability via Object.freeze
// Define a constants object
const CONSTANTS = {
    VALUE: 1
};

// Try and change the value property of the constant object
CONSTANTS.VALUE = 2;
console.log('New value', CONSTANTS.VALUE);

// Make the constants object immutable
Object.freeze(CONSTANTS);

// Try and change the value property after freezing the object
CONSTANTS.VALUE = 1;
console.log('New value', CONSTANTS.VALUE);
