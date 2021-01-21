'use strict';

const express = require('express');

const cacheService = require('./cache.service');

const helloWorldController = {
    generateGreeting: (req, res) => {
        const userId = req.query['userId'];

        if (cacheService.hasKey(userId)) {
            res.json({ message: `Hello ${cacheService.get(userId)}!` });
        } else {
            res.json({ message: 'Hello world!' });
        }
    }
};

const router = express.Router();
router.get('/', helloWorldController.generateGreeting);

module.exports = router;
