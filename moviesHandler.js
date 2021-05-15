"use-strict";

const Joi = require('joi');
const { MongoClient, ObjectId } = require('mongodb');
//Temporal URI, when deploy change to deploy database and credentials
const uri = process.env.DATABASE;

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
    };

    this.getMovies = async (detail, page, query) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect();
        let movies = await client.db('netflix-clone').collection('movies').find().toArray();
        await client.close();
        if(query){
            movies = movies.filter((value) =>{
                if(value.title.toLowerCase().includes(query.toLowerCase()) || value.description.toLowerCase().includes(query.toLowerCase()))return value;
            });
        }

        if(!page){
            nextPage = null;
        }else{
            page = parseInt(page);
            nextPage = (page*10)+10 < movies.length ? page+1:null;
            movies = movies.splice(page*10, 10);
        }
        if (detail){
            return {
                next_page: nextPage,
                movies: movies
            };
        }
        return {
            next_page: nextPage,
            movies: movies.map((value)=>{
                return {
                    thumbnail: value.thumbnail,
                    _id: value._id
                };
            })
        };
    }

    this.getMovie = async (id) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect();
        let movie = await client.db('netflix-clone').collection('movies').findOne({_id:ObjectId(id)});
        await client.close();
        return movie;
    };

    this.postMovie = async (movie) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect();
        await client.db('netflix-clone').collection('movies').insertOne(movie);
        client.close();
        return movie;
    }

    this.putMovie = async (id, movie) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect();
        await client.db('netflix-clone').collection('movies').updateOne(
            {_id:ObjectId(id)},
            { $set:{
                    title:movie.title,
                    description:movie.description,
                    image:movie.image,
                    trailer:movie.trailer,
                    thumbnail:movie.thumbnail
                }
            });
        client.close();
        movie._id = id;
        return movie;
    }

    this.deleteMovie = async (id) => {
        let client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});
        await client.connect(); 
        client.db('netflix-clone').collection('movies').deleteOne({
            _id:ObjectId(id)
        }, (err, obj) =>{
            client.close();
        });
    }
}

module.exports = new moviesHandler();