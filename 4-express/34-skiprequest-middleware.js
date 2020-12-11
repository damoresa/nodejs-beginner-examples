'use strict';

const skipRequestMiddleware = (req, res, next) => {
    const skipRequest = req.header('x-skip-request');
    if (skipRequest === 'true') {
        console.warn('Skipped request');
        res.sendStatus(401);
    } else {
        console.log('Continuing request');
        next();
    }
};

module.exports = skipRequestMiddleware;
