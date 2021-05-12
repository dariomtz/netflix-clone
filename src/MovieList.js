"use strict";

class MovieList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
        }

        this.addMovie = this.addMovie.bind(this);
    }

    fetchMovies(){
        return new Promise((resolve) => {
            resolve([
                {
                    "id": "1",
                    "title": "Peli chida",
                    "description": "ES una peli chida bien chida",
                    "image": "https://expressjs.com/en/guide/using-middleware.html",
                    "trailer": "https://expressjs.com/en/guide/using-middleware.html",
                    "thumbnail": "https://expressjs.com/en/guide/using-middleware.html",
                }
            ]);
        });
    }

    addMovie(movie){
        const movies = this.state.movies;
        movies.push(movie);

        this.setState({
            movies: movies,
        });
    }

    componentDidMount(){
        this.fetchMovies().then(movies => {
            this.setState({
                movies: movies,
            });
        });   
    }

    render(){
        return (
            <div>
                <ModalAddMovie addMovie={this.addMovie} movies={this.state.movies.length}/>
                { this.state.movies.map(movie => <MovieInfo key={movie.id} movie={movie}/>)}
            </div>
        );
    }
}