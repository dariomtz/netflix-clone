"use strict";

const e = React.createElement;

class MoviesApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            next_page: 0,
            loadingMore: false,
            search: '',
        };

        this.requestNum = 0;

        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchMovies = this.fetchMovies.bind(this);
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
            fetch(`/api/movies?page=${ this.state.next_page }&query=${ this.state.search }`, {
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
            loadingMore: true,
        });

        this.fetchMovies()
        .then(data => {
            if(this.requestNum != requestNum)
                return;

            this.updateState({
                movies: this.state.movies.concat(data.movies),
                next_page: data.next_page,
                loadingMore: false,
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

    componentDidMount(){
        this.fetchNextPage(this.requestNum);
    }

    render(){
        return (
            <div className="container text-white pb-5">
                <div className="row">
                    <div className="col-lg-6 col-md-4 col-12">
                        <h1 className="m-0">Movies</h1>
                    </div>

                    <div className="col-12 col-lg-6 col-md-8">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text text-white bg-dark border-0" id="icon-search">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </span>
                            </div>
                            <input type="text" 
                                    className="form-control bg-dark border-0 text-white" 
                                    placeholder="Search" 
                                    aria-label="Search" 
                                    aria-describedby="icon-search" 
                                    value={ this.state.search }
                                    onChange={ this.searchMovies }/>
                            <div className="input-group-append" id="button-addon4">
                                <button className="btn btn-dark border-0 " onClick={ this.cleanSearch } type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>

                { this.state.movies.map(movie => <MovieThumbnail key={movie._id} movie={movie} />) }

                { this.state.loadingMore ? <Spinner/> : ''}

                {
                    this.state.next_page !== null && !this.state.loadingMore ?
                    <div className="container-fluid pt-5">
                        <button className="btn btn-light" onClick={ () => this.fetchNextPage(++this.requestNum) }>
                            Load more
                        </button>
                    </div>
                    : ''
                }
                
            </div>
        );
    }
}

const domContainer = document.getElementById('movies-container');
ReactDOM.render(e(MoviesApp), domContainer);