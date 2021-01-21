'use strict';

const express = require('express');

const cacheService = require('./cache.service');

const personList = [{name: 'Bob', lastname: 'Doe'}, {name: 'John', lastname: 'Doe'}];

const cacheController = {
    initializeCache: (req, res) => {
        personList
            .map((person) => person.name)
            .forEach((person, index) => {
                cacheService.put(index, person);
            });

        res.json({ message: 'Cache initialized!' });
    },
    getKeys: (req, res) => {
        res.json({ keys: cacheService.getKeys() });
    },
    getContent: (req, res) => {
        res.json({ content: cacheService.getKeys().map((key) => cacheService.get(key)) });
    }
};

const router = express.Router();
router.get('/', cacheController.initializeCache);
router.get('/content', cacheController.getContent);
router.get('/keys', cacheController.getKeys);

module.exports = router;
