"use strict";

const { response } = require('express');
const express = require('express');
const dh = require('./data-handler.js');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/api/users', (req, res) => {
    res.send(dh.users);
});

app.post('/api/users', (req, res) => {
    const result = dh.validateUser(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const user = dh.postUser(req.body);
    res.status(201).send(user);
});

app.get('/api/users/:id', (req, res) => {
    const user = dh.getUser(req.params.id);
    if(!user) res.status(404).send('The user with this id does not exist.');
    
    res.send(user);
});

app.put('/api/users/:id', (req, res) => {
    let user = dh.getUser(req.params.id);
    if(!user) res.status(404).send('The user with this id does not exist.');

    const result = dh.validateUser(req.body);
    if(result.error) res.status(400).send(result.error.details[0].message);

    user = dh.putUser(req.params.id, req.body);
    res.send(user);
});

app.delete('/api/users/:id', (req, res) => {
    let user = dh.getUser(req.params.id);
    if(!user) res.status(404).send('The user with this id does not exist.');

    dh.deleteUser(req.params.id);
    res.status(204).send();
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));