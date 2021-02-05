'use strict';

// Import the express module & dependencies
const bodyParser = require('body-parser');
const express = require('express');

// Allocate an express application
const app = express();
const port = 3352;

// Body parser configuration
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// Persons management
const persons = require('./persons.json');

const getPersons = (req, res) => {
    res.json(persons);
};

const getPerson = (req, res) => {
    const personId = req.params.personId;

    if (!personId) {
        res.sendStatus(400);
    } else {
        const person = persons.find((person) => person.id === personId);
        if (!person) {
            res.sendStatus(404);
        } else {
            res.json(person);
        }
    }
};

app.get('/persons/', getPersons);
app.get('/persons/:personId', getPerson);


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
