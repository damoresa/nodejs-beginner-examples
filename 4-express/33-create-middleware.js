'use strict';

const requestTimeMiddleware = (req, res, next) => {
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log(`Request took ${(endTime - startTime) / 1000} seconds`);
};

module.exports = requestTimeMiddleware;
