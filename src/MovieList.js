"use strict";

class MovieList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            editing: new Set(),
            deleting: new Set(),
            next_page: 0,
        };        

        this.addMovie = this.addMovie.bind(this);
        this.editMovie = this.editMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
    }

    updateState(newState){
        const state = Object.assign({}, this.state);
        Object.assign(state, newState);
        this.setState(state);
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

            this.updateState({
                movies: movies,
            });
        });
    }

    editMovie(movie){
        this.state.editing.add(movie._id);
        this.setState(this.state);

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
            this.state.editing.delete(data._id);

            this.updateState({
                movies: movies,
            });
        });
    }

    deleteMovie(id){
        this.state.deleting.add(id);
        this.setState(this.state);

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
                this.state.deleting.delete(id);
                this.updateState({
                    movies: movies,
                });    
            }
        });            
    }

    componentDidMount(){
        this.fetchMovies().then(response => {
            this.updateState({
                movies: response.movies,
                next_page: response.next_page,
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
                        <MovieInfo key={movie._id}
                                    movie={ movie }
                                    delete={ this.deleteMovie } 
                                    deleting={ this.state.deleting.has(movie._id) } 
                                    editing={ this.state.editing.has(movie._id) }/>
                        <ModalMovie key={`modal${movie._id}`} id={movie._id} type="Edit" action={ this.editMovie } movie={movie}/>
                    </div>
                )}
            </div>
        );
    }
}