'use strict';

// DISCLAIMER: These scripts do not work as the
// imported modules do not exist. Their purpose
// is to exemplify module import/export and usage.

// Requiring Node APIs or installed modules
// can be done without specifying a path.
const http = require('http');
const axios = require('axios');

// Relative path from the importer must be 
// specified for local modules
const myService = require('./myservice');
const CONSTANTS = require('./core/constants');
