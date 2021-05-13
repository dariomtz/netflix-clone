"use strict";

class MovieList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
        };

        this.addMovie = this.addMovie.bind(this);
        this.editMovie = this.editMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
    }

    fetchMovies(){
        return new Promise((resolve) => {
            fetch('/api/movies?detail=true', {
                headers: {
                    'api-key': sessionStorage.getItem('key'),
                    'auth-token': sessionStorage.getItem('token'),
                },
            })
            .then(response => response.json())
            .then(data => resolve(data));
        });
    }

    addMovie(movie){
        const movies = this.state.movies;
        movie._id = movies.length + 1;

        movies.push(movie);

        this.setState({
            movies: movies,
        });
    }

    editMovie(movie){
        const movies = this.state.movies;
        let index = movies.findIndex(m => movie._id == m.id);
        movies[index] = movie;

        this.setState({
            movies: movies,
        });
    }

    deleteMovie(id){
        const movies = this.state.movies;
        let index = movies.findIndex(movie => id == movie._id);
        movies.splice(index, 1);

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
                    <div key={`wrapper${movie._id}`}>
                        <MovieInfo key={movie._id} id={movie._id} movie={movie} delete={ this.deleteMovie }/>
                        <ModalMovie key={`modal${movie._id}`} id={movie._id} type="Edit" action={ this.editMovie } movie={movie}/>
                    </div>
                )}
            </div>
        );
    }
}