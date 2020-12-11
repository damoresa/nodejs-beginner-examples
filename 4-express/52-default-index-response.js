'use strict';

const path = require('path');

const defaultIndexResponse = (req, res) => {
    const indexPath = path.join(__dirname, 'static', 'default-index.html');
    res.sendFile(indexPath);
};

module.exports = defaultIndexResponse;
