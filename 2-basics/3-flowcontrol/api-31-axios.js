'use strict';

const axios = require('axios');

const main = async () => {
    const response = await axios.get('http://localhost:3000/api/hotels/');
    return response.data;
};

main()
    .then(console.log)
    .catch(console.error);
