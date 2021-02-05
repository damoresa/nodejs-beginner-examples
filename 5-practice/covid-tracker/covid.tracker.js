'use strict';

// Import the express module & dependencies
const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

// Allocate an express application
const app = express();
const port = 3355;

// Body parser configuration
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// Orchestration flow management
const AUTH_URI = 'http://localhost:3351';
const PERSONS_URI = 'http://localhost:3352';
const INTERACTIONS_URI = 'http://localhost:3353';
const NOTIFICATION_URI = 'http://localhost:3354';

const validateAccessMiddleware = async (req, res, next) => {
    const accessToken = req.headers['authorization'];
    console.log('Received token', accessToken);

    if (!accessToken) {
        res.sendStatus(401);
    } else {
        try {
            const authResponse = await axios.get(`${AUTH_URI}/login/`, {headers: {'authorization': accessToken}});
            req.customContext = authResponse.data;
            next();
        } catch (err) {
            res.sendStatus(403);
        }
    }
};

const trackInfection = async (req, res) => {
    const personId = req.body.personId;

    if (!personId) {
        res.status(400).json({message: 'No person provided for infection tracking'});
    } else {
        try {
            console.log('Allocating interactions');
            const interactions = await axios.get(`${INTERACTIONS_URI}/interactions/person/${personId}`);
            // Complex reduction, data has to be transformed from [[]] to a unique value collection {}
            const involvedPersons = interactions.data
                // Map the nested array to the desired format
                .map((interaction) => interaction.persons)
                // Flatten the array ([[]] -> []), these two operations combined are what a flatMap would do
                .reduce((aggr, persons) => aggr.concat(persons), [])
                // Transform the [] into a unique value collection
                .reduce((aggr, curr) => {
                    return aggr.add(curr);
                }, new Set());

            // Remove the infected person from the involved list
            involvedPersons.delete(personId);

            console.log('Allocating person data');
            const personDataPromises = Array.from(involvedPersons)
                .map((personId) => axios.get(`${PERSONS_URI}/persons/${personId}`));
            const personDataResponses = await Promise.all(personDataPromises);

            console.log('Generating notifications');
            const notificationPromises = personDataResponses
                .map((response) => response.data)
                .map((response) => axios.post(`${NOTIFICATION_URI}/notification/`, response));

            const notificationResponses = await Promise.all(notificationPromises);
            console.log(`Delivered ${notificationResponses.length} notifications`);

            res.sendStatus(200);
        } catch (err) {
            console.error('Unexpected error', err);
            res.sendStatus(500);
        }
    }
};

app.use(validateAccessMiddleware);
app.post('/tracking/', trackInfection);


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
