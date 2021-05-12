"use strict";

class MovieList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
        };

        this.addMovie = this.addMovie.bind(this);
        this.editMovie = this.editMovie.bind(this);
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
        movie.id = movies.length + 1;

        movies.push(movie);

        this.setState({
            movies: movies,
        });
    }

    editMovie(movie){
        const movies = this.state.movies;
        let index = movies.findIndex(m => movie.id == m.id);
        movies[index] = movie;

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
                <ModalMovie type="Add" action={ this.addMovie }/>
                { this.state.movies.map(movie => 
                    <div key={`wrapper${movie.id}`}>
                        <MovieInfo key={movie.id} id={movie.id} movie={movie}/>
                        <ModalMovie key={`modal${movie.id}`} id={movie.id} type="Edit" action={ this.editMovie } movie={movie}/>
                    </div>
                )}
            </div>
        );
    }
}