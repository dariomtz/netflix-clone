"use strict";

const express = require('express');
const dh = require('./moviesHandler');
const app = express.Router();

app.get('/', (req, res) => {
    res.send(dh.getMovies());
});

function middlewareValidateMovie(req, res, next){
    const result = dh.validateMovie(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    } 
    req.movie = result.value;
    next();
}

app.post('/', middlewareValidateMovie);
app.post('/', (req, res) => {
    res.status(201).send(dh.postMovie(req.movie));
});

function middleware404(req, res, next){
    const movie = dh.getMovie(req.params.id);
    if(!movie) res.status(404).send('The movie with this id does not exist.');
    req.movie = movie;
    req.movieId = req.params.id;
    next();
}

app.use('/:id', middleware404);

app.get('/:id', (req, res) => {
    res.send(movie);
});

app.put('/:id', middlewareValidateMovie);
app.put('/:id', (req, res) => {
    res.send(dh.putMovie(req.movieId, req.body));
});

app.delete('/:id', (req, res) => {
    dh.deleteMovie(req.movieId);
    res.status(204).send();
});

module.exports = app;