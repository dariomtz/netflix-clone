"use strict";

const express = require('express');
const dh = require('./moviesHandler');
const middleware = require('./middleware');

const app = express.Router();

//middleware
app.use(middleware.API);
app.use(middleware.authentication);

app.use('/:id', middleware.movieExists);

app.post('/', middleware.validateMovie);
app.put('/:id', middleware.validateMovie);

//endpoints
app.get('/', async (req, res) => {
    res.send(await dh.getMovies(req.query.detail));
});

app.post('/', async (req, res) => {
    res.status(201).send(await dh.postMovie(req.movie));
});

app.get('/:id', (req, res) => {
    res.send(req.movie);
});

app.put('/:id', async (req, res) => {
    res.send(await dh.putMovie(req.movieId, req.body));
});

app.delete('/:id', async (req, res) => {
    await dh.deleteMovie(req.movieId);
    res.status(204).send();
});

module.exports = app;