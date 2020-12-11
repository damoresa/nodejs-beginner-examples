'use strict';

const fs = require('fs').promises;
const path = require('path');

// File paths
const input1Path = path.join(__dirname, 'input1.txt');
const input2Path = path.join(__dirname, 'input2.txt');
const outputPath = path.join(__dirname, 'output.txt');

// Open files, merge their content
const main = async (inputPaths) => {
    // Generate the read file promises from the file paths
    const readPromises = inputPaths.map((filePath) => {
        return fs.readFile(filePath);
    });

    let returnMessage;

    // Wrap the execution in a try/catch block to control errors
    try {
        // Execute all read promises in parallel
        const readData = await Promise.all(readPromises);
        // Process the read data and write the file
        const data = readData.reduce((aggr, curr) => {
            return `${aggr}${curr}`;
        }, '');
        await fs.writeFile(outputPath, data);
        returnMessage = `File ${outputPath} written`;
    } catch (err) {
        returnMessage = 'Unable to read or merge data';
    }

    return returnMessage;
}

// Since await can only be used within async blocks, we must
// process the main Promise "manually". This is being looked up
// and will probably be addressed in future NodeJS versions.
main([input1Path, input2Path])
    .then(console.log)
    .catch(console.error);
