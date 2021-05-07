"use strict";

const express = require('express');
const dh = require('./data-handler');
const usersRouter = require('./users');
const pagesRouter = require('./pages');
const moviesRouter = require('./movies');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use(pagesRouter);

app.get('/api/key', (req, res) => {
    res.send({
        key: dh.generateAPIKey(),
    });
});

function middlewareAPI(req, res, next){
    let key = req.header('api-key');
    if(!dh.validKey(key)){
        res.status(401);
        res.send('Invalid or missing api-key');
        return;
    }

    dh.saveTransaction(key, {
        method: req.method,
        endpoint: req.path,
    });

    next();
}

app.use('/api/signin', middlewareAPI);
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

function middlewareAuthentication(req, res, next){
    let session = req.header('auth-token');
    if(!dh.validSession(session)){
        res.status(403);
        res.send('User not authenticated.');
        return;
    }

    req.userId = session.split('/').pop();

    next();
}

function middlewareAuthorization(req, res, next){
    if(req.params.id != req.userId){
        res.status(403);
        res.send('User not authorized for this opperation.');
        return;
    }

    next();
}

app.use('/api/users', middlewareAPI);
app.use('/api/users/:id', middlewareAPI);
app.use('/api/users/:id', middlewareAuthentication);
app.use('/api/users/:id', middlewareAuthorization);
app.use('/api/users', usersRouter);

app.use('/api/movies', middlewareAPI);
app.use('/api/movies', middlewareAuthentication);
app.use('/api/movies/:id', middlewareAPI);
app.use('/api/movies/:id', middlewareAuthentication);
app.use('/api/movies', moviesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));