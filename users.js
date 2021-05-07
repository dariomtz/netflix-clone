"use strict";

const express = require('express');
const dh = require('./usersHandler');
const middleware = require('./middleware');
const app = express.Router();

//middleware
app.use(middleware.API);

app.use('/:id', middleware.authentication);
app.use('/:id', middleware.authorization);
app.use('/:id', middleware.userExists);

app.post('/').put('/:id').use(middleware.validateUser);

//endpoints
app.post('/', (req, res) => {
    const user = dh.postUser(req.body);

    if (!user){
        res.status(400).send('Email already in use for another account.');
        return;
    }

    res.status(201).send(user);
});

app.get('/:id', (req, res) => {
    res.send(req.user);
});

app.put('/:id', (req, res) => {
    const user = dh.putUser(req.params.id, req.body);
    res.send(user);
});

app.delete('/:id', (req, res) => {
    dh.deleteUser(req.params.id);
    res.status(204).send();
});

module.exports = app;