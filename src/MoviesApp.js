"use strict";

const e = React.createElement;

class MoviesApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            next_page: 0,
            loadingMore: false,
        };

        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchMovies = this.fetchMovies.bind(this);
    }
    
    updateState(newState){
        const state = Object.assign({}, this.state);
        Object.assign(state, newState);
        this.setState(state);
    }

    fetchMovies(){
        console.log(this.state.next_page);
        return new Promise((resolve) => {
            fetch(`/api/movies?page=${this.state.next_page}`, {
                headers: {
                    'api-key': sessionStorage.getItem('key'),
                    'auth-token': sessionStorage.getItem('token'),
                },
            })
            .then(response => response.json())
            .then(data => resolve(data));
        });
    }

    fetchNextPage(){
        this.updateState({
            loadingMore: true,
        });

        this.fetchMovies()
        .then(data => {
            this.updateState({
                movies: this.state.movies.concat(data.movies),
                next_page: data.next_page,
                loadingMore: false,
            })
        })
    }

    componentDidMount(){
        this.fetchNextPage();
    }

    render(){
        return (
            <div className="container text-white pb-5">
                <h1>Movies</h1>
                <hr/>

                { this.state.movies.map(movie => <MovieThumbnail key={movie._id} movie={movie} />) }

                { this.state.loadingMore ? <Spinner/> : ''}

                {
                    this.state.next_page !== null && !this.state.loadingMore ?
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

const domContainer = document.getElementById('movies-container');
ReactDOM.render(e(MoviesApp), domContainer);