"use strict";

const e = React.createElement;

class MoviesApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        };
    }

    fetchMovies(){
        return new Promise((resolve) => {
            fetch('/api/movies', {
                headers: {
                    'api-key': sessionStorage.getItem('key'),
                    'auth-token': sessionStorage.getItem('token'),
                },
            })
            .then(response => response.json())
            .then(data => resolve(data));
        });
    }

    componentDidMount(){
        this.fetchMovies()
        .then(data => {
            console.log(data);
            this.setState({
                loading: false,
                movies: data,
            });
        })
    }

    render(){
        return (
            <div className="container text-white pb-5">
                <h1>Movies</h1>
                <hr/>
                { this.state.loading ? 
                <Spinner/>
                : this.state.movies.map(movie => <MovieThumbnail key={movie._id} movie={movie} />) }
            </div>
        );
    }
}

const domContainer = document.getElementById('movies-container');
ReactDOM.render(e(MoviesApp), domContainer);