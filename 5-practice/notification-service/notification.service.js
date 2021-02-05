'use strict';

// Import the express module & dependencies
const bodyParser = require('body-parser');
const express = require('express');

// Allocate an express application
const app = express();
const port = 3354;

// Body parser configuration
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// Notification management
const generateNotification = (req, res) => {
    const user = req.body;

    if (!user || !user.hasOwnProperty('email')) {
        res.status(400).json({ message: 'Unable to generate notification to invalid user object.' });
    } else {
        res.sendStatus(200);
    }
};

app.post('/notification/', generateNotification);


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
