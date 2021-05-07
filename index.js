"use strict";

const express = require('express');
const dh = require('./usersHandler');
const usersRouter = require('./users');
const pagesRouter = require('./pages');
const moviesRouter = require('./movies');
const middleware = require('./middleware');

const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());

app.use(pagesRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/signin', middleware.API);

//endpoints
app.get('/api/key', (req, res) => {
    res.send({
        key: dh.generateAPIKey(),
    });
});

app.post('/api/signin', (req, res)=>{
    let userId = dh.signin(req.body);

    if(!userId){
        res.status(400);
        res.send('Bad singin information. Check email and password.');
        return;
    }

    res.send({
        token: dh.createSession(userId),
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));