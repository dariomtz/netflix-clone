"use-strict";

const usersDH = require('./usersHandler');
const moviesDH = require('./moviesHandler');

function middleware(){
    this.API = async (req, res, next) => {
        let key = req.header('api-key');
        if(await !usersDH.validKey(key)){
            res.status(401);
            res.send('Invalid or missing api-key');
            return;
        }
    
        await usersDH.saveTransaction(key, {
            method: req.method,
            endpoint: req.path,
        });
    
        next();
    }

    this.authentication = async (req, res, next) => {
        let session = req.header('auth-token');
        if(await !usersDH.validSession(session)){
            res.status(403);
            res.send('User not authenticated.');
            return;
        }
    
        req.userId = session.split('/').pop();
    
        next();
    }

    this.authorization = (req, res, next) => {
        if(req.params.id != req.userId){
            res.status(403);
            res.send('User not authorized for this opperation.');
            return;
        }

        next();
    }

    this.validateUser = (req, res, next) => {
        const result = usersDH.validateUser(req.body);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        }
        next();
    }

    this.userExists = async (req, res, next) => {
        const user = await usersDH.getUser(req.params.id);
        if(!user) {
            res.status(404).send('The user with this id does not exist.');
            return;
        }

        req.user = user;
        next();
    }

    this.validateMovie = (req, res, next) => {
        const result = moviesDH.validateMovie(req.body);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        } 
        req.movie = result.value;
        next();
    }

    this.movieExists = (req, res, next) => {
        const movie = moviesDH.getMovie(req.params.id);
        if(!movie) {
            res.status(404).send('The movie with this id does not exist.');
            return;
        }
        req.movie = movie;
        req.movieId = req.params.id;
        next();
    }

}

module.exports = new middleware();