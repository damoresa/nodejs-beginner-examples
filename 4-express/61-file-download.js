'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const fileDownload = (req, res) => {
    const filename = req.query['filename'];

    if (filename) {
        // Create a read stream on the file to download
        const filePath = path.join(__dirname, filename);
        const readStream = fs.createReadStream(filePath);
        // Add error control
        readStream.on('error', (err) => errorHandler(res, err));
        // Pipe the read stream into the response
        readStream.pipe(res).on('error', (err) => errorHandler(res, err));
    } else {
        res.status(400).json({message: 'filename must be specified as a query parameter.'});
    }
};

const errorHandler = (res, err) => {
    console.error('Unable to generate stream', err);
    res.status(500).json({message: 'Unable to generate stream.'});
};

const router = express.Router();
router.get('/', fileDownload);

module.exports = router;
