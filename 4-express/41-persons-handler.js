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

        if (name && lastname) {
            try {
                const person = {name, lastname};
                personList.push(person);
                res.json(person);
            } catch (err) {
                res.status(500).json({message: 'Unexpected error. Please contact an administrator.'});
            }
        } else {
            res.status(400).json({message: 'Invalid request missing either person name or last name'});
        }
    }
};

const router = express.Router();
router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);

module.exports = router;
