'use strict';

// Import the express module
const bodyParser = require('body-parser');
const express = require('express');

// Import handlers
const personsHandler = require('./31-persons-handler');
const requestTimeMiddleware = require('./33-create-middleware');
const skipRequestMiddleware = require('./34-skiprequest-middleware');
const personsHandlerErrControl = require('./41-persons-handler');
const staticFileHandler = require('./51-static-file-handler');
const defaultIndexResponse = require('./52-default-index-response');
const downloadHandler = require('./61-file-download');
const forwardHandler = require('./62-request-forwarder');

// Allocate an express application
const app = express();
const port = 3300;

// Static folder path
app.use('/public', staticFileHandler);

// Body parser configuration
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// Middleware
// app.use(requestTimeMiddleware);
// app.use(skipRequestMiddleware);

// Endpoints
// app.use(personsHandler);
// app.use('/download', downloadHandler);
// app.use('/forward', forwardHandler);

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
