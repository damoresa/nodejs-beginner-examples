'use strict';

const express = require('express');
const http = require('http');

const forwardHandler = (req, res) => {
    // Configure the forwarded request
    const reqOpts = {
        headers: req.headers,
        hostname: 'localhost',
        method: req.method,
        path: '/forward/mockUri',
        port: 3300,
        protocol: 'http:'
    };

    // The connector request will propagate the body
    // headers and query params to the target site
    // On completion, it will forward the response to
    // the original response.
    const connector = http.request(reqOpts, (response) => {
        // response.writeHead(res.statusCode, res.headers);
        response.pipe(res).on('error', console.error);
    });

    // Pipe the original request into the connector
    req.pipe(connector).on('error', console.error);
};

const mockHandler = (req, res) => {
    console.log('Received request!');
    console.log('Headers', req.headers);
    console.log('Query params', req.query);
    console.log('Path params', req.params);

    res.json({message: 'Hello forward!'});
};

const router = express.Router();
router.get('/mockUri', mockHandler);
router.use('*', forwardHandler);

module.exports = router;
