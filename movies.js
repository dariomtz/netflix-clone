"use strict";

const express = require('express');
const dh = require('./moviesHandler');
const middleware = require('./middleware');

const app = express.Router();

//middleware
app.use(middleware.API);
app.use(middleware.authentication);

app.use('/:id', middleware.movieExists);

// app.post('/', middleware.validateMovie);
// app.put('/:id', middleware.validateMovie);
app.post('/').put('/:id').use(middleware.validateMovie);

//endpoints
app.get('/', (req, res) => {
    res.send(dh.getMovies());
});

app.post('/', (req, res) => {
    res.status(201).send(dh.postMovie(req.movie));
});

app.get('/:id', (req, res) => {
    res.send(req.movie);
});

app.put('/:id', (req, res) => {
    res.send(dh.putMovie(req.movieId, req.body));
});

app.delete('/:id', (req, res) => {
    dh.deleteMovie(req.movieId);
    res.status(204).send();
});

module.exports = app;