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

app.post('/', middleware.validateUser);
app.put('/:id', middleware.validateUser);
//endpoints
app.post('/', async (req, res) => {
    const user = await dh.postUser(req.body);

    if (!user){
        res.status(400).send('Email already in use for another account.');
        return;
    }

    res.status(201).send(user);
});

app.get('/:id', (req, res) => {
    res.send(req.user);
});

app.put('/:id', async (req, res) => {
    const user = await dh.putUser(req.params.id, req.body);
    res.send(user);
});

app.delete('/:id', async (req, res) => {
    await dh.deleteUser(req.params.id);
    res.status(204).send();
});

module.exports = app;