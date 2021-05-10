"use strict";

class MovieList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
        }
    }

    fetchMovies(){
        return [
            {
                "id": "1",
                "title": "Peli chida",
                "description": "ES una peli chida bien chida",
                "image": "https://expressjs.com/en/guide/using-middleware.html",
                "trailer": "https://expressjs.com/en/guide/using-middleware.html",
                "thumbnail": "https://expressjs.com/en/guide/using-middleware.html",
            }
        ]
    }

    componentDidMount(){
        let movies = this.fetchMovies();
        this.setState({
            movies: movies,
        });
    }

    render(){
        return (
            <div>
                { this.state.movies.map(movie => <MovieInfo key={movie.id} movie={movie}/>)}
            </div>
        );
    }
}