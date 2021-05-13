"use strict";

class MovieList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
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
        fetch('/api/movies', {
            method: 'POST',
            headers: {
                'api-key': sessionStorage.getItem('key'),
                'auth-token': sessionStorage.getItem('token'),
                'Content-type': 'application/json',
            },
            body: JSON.stringify(movie),
        })
        .then(response => response.json())
        .then(data =>{
            movies.push(data);

            this.setState({
                movies: movies,
            });
        });
    }

    editMovie(movie){
        const movies = this.state.movies;
        let id = movie._id;
        delete movie._id;
        let index = movies.findIndex(m => id == m._id);
        fetch(`/api/movies/${ id }`, {
            method: 'PUT',
            headers: {
                'api-key': sessionStorage.getItem('key'),
                'auth-token': sessionStorage.getItem('token'),
                'Content-type': 'application/json',
            },
            body: JSON.stringify(movie),
        })
        .then(response => response.json())
        .then(data => {
            movies[index] = data;

            this.setState({
                movies: movies,
            });
        });
    }

    deleteMovie(id){
        const movies = this.state.movies;
        let index = movies.findIndex(movie => id == movie._id);

        fetch(`/api/movies/${ id }`, {
            method: 'DELETE',
            headers: {
                'api-key': sessionStorage.getItem('key'),
                'auth-token': sessionStorage.getItem('token'),
            },
        })
        .then(response => {
            if(response.status == 204){
                
                movies.splice(index, 1);
                this.setState({
                    movies: movies,
                });    
            }
        });            
    }

    componentDidMount(){
        this.fetchMovies().then(movies => {
            this.setState({
                movies: movies,
                loading: false,
            });
        });   
    }

    render(){
        return (
            <div>
                <ModalMovie type="Add" action={ this.addMovie }/>

                { this.state.loading ?
                 <Spinner/>
                 :
                 this.state.movies.map(movie => 
                    <div key={`wrapper${movie._id}`}>
                        <MovieInfo key={movie._id} id={movie._id} movie={movie} delete={ this.deleteMovie }/>
                        <ModalMovie key={`modal${movie._id}`} id={movie._id} type="Edit" action={ this.editMovie } movie={movie}/>
                    </div>
                )}
            </div>
        );
    }
}