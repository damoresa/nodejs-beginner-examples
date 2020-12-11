'use strict';

const fs = require('fs').promises;
const path = require('path');

// File paths
const input1Path = path.join(__dirname, 'input1.txt');
const input2Path = path.join(__dirname, 'input2.txt');
const outputPath = path.join(__dirname, 'output.txt');

// Open files, merge their content
const inputPaths = [input1Path, input2Path];
const readPromises = inputPaths.map((filePath) => {
    return fs.readFile(filePath);
});

// Promise.all executes all the promises in parallel, failing if
// any of those promises fail. Promises can also be chained using then,
// effectively helping us avoid the 'callback hell'.
Promise.all(readPromises)
    .then((readData) => {
        // Read data is an array of responses
        const data = readData.reduce((aggr, curr) => {
            return `${aggr}${curr}`;
        }, '');

        // Return a write file promise
        return fs.writeFile(outputPath, data);
    })
    .then(() => {
        console.log(`File ${outputPath} written`);
    })
    .catch((err) => {
        console.error('Unable to merge/write files', err);
    });
