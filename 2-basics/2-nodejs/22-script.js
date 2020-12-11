'use strict';

// Import the userList function
const userList = require('./21-module');

// Invoke it and process it's response using NodeJS' functional features
userList()
    .map((user) => {
        return `${user.name} ${user.lastname}`;
    })
    .forEach((user, index) => { console.log(`${index}: ${user}`); });
