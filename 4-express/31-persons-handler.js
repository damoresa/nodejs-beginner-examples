'use strict';

const express = require('express');

const personList = [{name: 'Bob', lastname: 'Doe'}, {name: 'John', lastname: 'Doe'}];

const usersController = {
    getUsers: (req, res) => {
        res.json(personList);
    },
    createUser: (req, res) => {
        const name = req.body.name;
        const lastname = req.body.lastname;

        personList.push({name, lastname});

        res.sendStatus(200);
    }
};

const router = express.Router();
router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);

module.exports = router;
