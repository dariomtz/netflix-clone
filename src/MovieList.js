"use strict";

class MovieList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            editing: new Set(),
            deleting: new Set(),
            next_page: 0,
            movies:[],
            search: ''
        };      
        
        this.requestNum = 0;

        this.fetchMovies = this.fetchMovies.bind(this);
        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.editMovie = this.editMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.searchMovies = this.searchMovies.bind(this);
        this.cleanSearch = this.cleanSearch.bind(this);
    }

    updateState(newState, callback){
        const state = Object.assign({}, this.state);
        Object.assign(state, newState);
        this.setState(state, callback);
    }

    fetchMovies(){
        return new Promise((resolve) => {
            fetch(`/api/movies?detail=true&page=${ this.state.next_page }&query=${ this.state.search }`, {
                headers: {
                    'api-key': sessionStorage.getItem('key'),
                    'auth-token': sessionStorage.getItem('token'),
                },
            })
            .then(response => response.json())
            .then(data => resolve(data));
        });
    }

    fetchNextPage(requestNum){
        this.updateState({
            loading: true,
        });

        this.fetchMovies()
        .then(data => {
            if(this.requestNum != requestNum)
                return;

            this.updateState({
                movies: this.state.movies.concat(data.movies),
                next_page: data.next_page,
                loading: false,
            })
        })
    }

    searchMovies(event){
        this.updateState({
            search: event.target.value,
            next_page: 0,
            movies: [],
        }, () => {
            this.fetchNextPage(++this.requestNum);
        });   
    }

    cleanSearch(){
        this.searchMovies({
            target:{
                value: '',
            },
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
        this.fetchNextPage(this.requestNum);
    }

    render(){
        return (
            <div>
                <div className="input-group my-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text border-0" id="icon-search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </span>
                    </div>
                    <input type="text" 
                            className="form-control border-0" 
                            placeholder="Search" 
                            aria-label="Search" 
                            aria-describedby="icon-search" 
                            value={ this.state.search }
                            onChange={ this.searchMovies }/>
                    <div className="input-group-append" id="button-addon4">
                        <button className="btn btn-light" onClick={ this.cleanSearch } type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <ModalMovie type="Add" action={ this.addMovie }/>

                { 
                    this.state.movies.length == 0 && !this.state.loading 
                    ?
                    <h5 className="text-white">No movies match the search.</h5>
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

                { this.state.loading ? <Spinner/> : '' }

                {
                    this.state.next_page !== null && !this.state.loading ?
                    <div className="container-fluid pt-5">
                        <button className="btn btn-light" onClick={ this.fetchNextPage }>
                            Load more
                        </button>
                    </div>
                    : ''
                }

            </div>
        );
    }
}