"use-strict";

const Joi = require('joi');

function moviesHandler(){
    this.lastMovieId = 0;
    this.movies = [];
    
    this.movieSchema = Joi.object({
        title: Joi.string()
                .required(),
        description: Joi.string()
                .required(),
        image: Joi.string()
                .uri()
                .required(),
        trailer: Joi.string()
                .uri()
                .required(),
        thumbnail: Joi.string()
                .uri()
                .required(),
    });

    this.validateMovie = (movie) => {
        return this.movieSchema.validate(movie);
    }

    this.getMovies = () => {
        return this.movies.map((value)=>{
            return {
                thumbnail: value.thumbnail,
                id: value.id
            }
        });
    }

    this.getMovie = (id) => {
        return this.movies.find(movie => id == movie.id);
    }

    this.postMovie = (movie) => {
        movie.id = ++this.lastMovieId;
        this.movies.push(movie);
        return movie;
    }

    this.putMovie = (id, movie) => {
        const index = this.movies.findIndex(movies => movies.id == id);
        movie.id = id;
        this.movies[index] = movie;
        return movie;
    }

    this.deleteMovie = (id) => {
        const index = this.movies.findIndex(movie => movie.id == id);
        this.movies.splice(index, 1);
    }
}

module.exports = new moviesHandler();