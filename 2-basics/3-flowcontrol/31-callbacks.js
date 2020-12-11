'use strict';

const fs = require('fs');
const path = require('path');

// File paths
const input1Path = path.join(__dirname, 'input1.txt');
const input2Path = path.join(__dirname, 'input2.txt');
const outputPath = path.join(__dirname, 'output.txt');

// Open files, merge their content
fs.readFile(input1Path, (err1, data1) => {
    if (err1) {
        console.error(err1);
    } else {
        fs.readFile(input2Path, (err2, data2) => {
            if (err2) {
                console.error(err2);
            } else {
                const data = data1 + data2;

                // Write the output file
                fs.writeFile(outputPath, data, (err) => {
                    if (err) {
                        console.error(`Unable to write file ${outputPath}`);
                    } else {
                        console.log(`File ${outputPath} written`);
                    }
                });
            }
        });
    }
});

// NOTE: Quickly realize how the 'callback hell' happens and our code starts
// to look like a pyramid. Promises and async/await help write much cleaner &
// readable code.
