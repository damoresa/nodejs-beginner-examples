'use strict';

const express = require('express');

const greetingController = require('./greeting.controller');
const cacheController = require('./cache.controller');

// Allocate an express application
const app = express();
const port = 3300;

app.use('/greeting', greetingController);
app.use('/cache', cacheController);

// Default handler
const defaultHandler = (req, res) => {
    res.sendStatus(200);
};

// app.all('*', defaultIndexResponse);
app.all('*', defaultHandler);

// Configure exposed port and start listening
app.listen(port, () => {
    console.log(`Application listening on ${port}`);
});

// Configure error handler
app.on('error', (err) => {
    console.error(`Application unable to start on port ${port}`, err);
});
