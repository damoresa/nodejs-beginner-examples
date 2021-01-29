'use strict';

// Import the express module & dependencies
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');

// Allocate an express application
const app = express();
const port = 3351;

// Body parser configuration
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// JWT management
const JWT_TOKEN_SECRET = '123456!"·$%&';
const users = require('./users.json');

const userLogin = (req, res) => {
	const username = req.body.username;
	const pass = req.body.pass;
	
	if (!username || !pass) {
		res.sendStatus(400);
	} else {
		const user = users.find((user) => user.username === username && user.pass === pass);
		if (!user) {
			res.sendStatus(403);
		} else {
			const token = jwt.sign({ user }, JWT_TOKEN_SECRET, { expiresIn: '1800s' });
			res.json({ token });
		}
	}
};

const validateUserAccess = (req, res) => {
	const tokenHeader = req.headers['authorization'];
	const token = tokenHeader && tokenHeader.split(' ')[1];
	
	if (!token) {
		res.sendStatus(401);
	} else {
		jwt.verify(token, JWT_TOKEN_SECRET, (err, tokenData) => {
			if (err) {
				res.sendStatus(403);
			} else {
				res.json({ username: tokenData.user.username });
			}
		});
	}
};

app.get('/login/', validateUserAccess);
app.post('/login/', userLogin);


// Default handler
const defaultHandler = (req, res) => {
    res.sendStatus(200);
};

// app.all('*', defaultIndexResponse);
app.all('*', defaultHandler);

// Configure exposed port and start listening
app.listen(port, () => {
    console.log(`Application listening on ${port}`);
});

// Configure error handler
app.on('error', (err) => {
    console.error(`Application unable to start on port ${port}`, err);
});
