"use strict";

const express = require('express');
const dh = require('./moviesHandler.js');
const app = express.Router();

app.post('/', (req, res) => {
    const result = dh.validateUser(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const user = dh.postUser(req.body);

    if (!user){
        res.status(400).send('Email already in use for another account.');
        return;
    }

    res.status(201).send(user);
});

app.get('/:id', (req, res) => {
    const user = dh.getUser(req.params.id);
    if(!user) res.status(404).send('The user with this id does not exist.');
    
    res.send(user);
});

app.put('/:id', (req, res) => {
    let user = dh.getUser(req.params.id);
    if(!user) res.status(404).send('The user with this id does not exist.');

    const result = dh.validateUser(req.body);
    if(result.error) res.status(400).send(result.error.details[0].message);

    user = dh.putUser(req.params.id, req.body);
    res.send(user);
});

app.delete('/:id', (req, res) => {
    let user = dh.getUser(req.params.id);
    if(!user) res.status(404).send('The user with this id does not exist.');

    dh.deleteUser(req.params.id);
    res.status(204).send();
});

module.exports = app;