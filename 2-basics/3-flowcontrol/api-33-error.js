'use strict';

const axios = require('axios');

const main = async () => {
    const uri = 'http://localhost:3001/';
    try {
        await axios.get(uri);
    } catch (err) {
        throw new Error(`Unable to perform request at ${uri}`);
    }
};

main()
    .then(console.log)
    .catch(console.error);
