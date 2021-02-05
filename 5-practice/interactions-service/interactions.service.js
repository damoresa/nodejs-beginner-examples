'use strict';

// Import the express module & dependencies
const bodyParser = require('body-parser');
const express = require('express');

// Allocate an express application
const app = express();
const port = 3353;

// Body parser configuration
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// Interactions management
const interactions = require('./interactions.json');

const getInteractions = (req, res) => {
    res.json(interactions);
};

const getPersonInteractions = (req, res) => {
    const personId = req.params.personId;

    if (!personId) {
        res.status(400).json({ message: 'Person identifier must be provided. '});
    } else {
        const interaction = interactions.filter((interaction) => interaction.persons.indexOf(personId) > -1);
        if (!interaction) {
            res.sendStatus(404);
        } else {
            res.json(interaction);
        }
    }
};

const registerInteraction = (req, res) => {
    const persons = req.body.persons;

    if (!persons || persons <= 1) {
        res.status(400).json({ message: 'Invalid interaction object. Either missing persons or only one reported person.' });
    } else {
        interactions.push({ persons, date: new Date().toISOString() });
        res.sendStatus(200);
    }
};

app.get('/interactions/', getInteractions);
app.get('/interactions/person/:personId', getPersonInteractions);
app.post('/interactions/', registerInteraction);


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
