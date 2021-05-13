const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/landing.html');
});
app.get('/signin', (req, res) => {
	res.sendFile(__dirname + '/public/signin.html');
});
app.get('/signup', (req, res) => {
	res.sendFile(__dirname + '/public/signup.html');
});
app.get('/movies', (req, res) => {
	res.sendFile(__dirname + '/public/movies.html');
});
app.get('/movie/:id', (req, res) => {
	res.sendFile(__dirname + '/public/movie.html');
});
app.get('/admin', (req, res) => {
	res.sendFile(__dirname + '/public/admin.html');
});

module.exports = app;