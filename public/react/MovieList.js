"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovieList = function (_React$Component) {
    _inherits(MovieList, _React$Component);

    function MovieList(props) {
        _classCallCheck(this, MovieList);

        var _this = _possibleConstructorReturn(this, (MovieList.__proto__ || Object.getPrototypeOf(MovieList)).call(this, props));

        _this.state = {
            loading: true,
            editing: new Set(),
            deleting: new Set(),
            next_page: 0,
            movies: [],
            search: ''
        };

        _this.requestNum = 0;

        _this.fetchMovies = _this.fetchMovies.bind(_this);
        _this.fetchNextPage = _this.fetchNextPage.bind(_this);
        _this.addMovie = _this.addMovie.bind(_this);
        _this.editMovie = _this.editMovie.bind(_this);
        _this.deleteMovie = _this.deleteMovie.bind(_this);
        _this.searchMovies = _this.searchMovies.bind(_this);
        _this.cleanSearch = _this.cleanSearch.bind(_this);
        return _this;
    }

    _createClass(MovieList, [{
        key: 'updateState',
        value: function updateState(newState, callback) {
            var state = Object.assign({}, this.state);
            Object.assign(state, newState);
            this.setState(state, callback);
        }
    }, {
        key: 'fetchMovies',
        value: function fetchMovies() {
            var _this2 = this;

            return new Promise(function (resolve) {
                fetch('/api/movies?detail=true&page=' + _this2.state.next_page + '&query=' + _this2.state.search, {
                    headers: {
                        'api-key': sessionStorage.getItem('key'),
                        'auth-token': sessionStorage.getItem('token')
                    }
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    return resolve(data);
                });
            });
        }
    }, {
        key: 'fetchNextPage',
        value: function fetchNextPage(requestNum) {
            var _this3 = this;

            this.updateState({
                loading: true
            });

            this.fetchMovies().then(function (data) {
                if (_this3.requestNum != requestNum) return;

                _this3.updateState({
                    movies: _this3.state.movies.concat(data.movies),
                    next_page: data.next_page,
                    loading: false
                });
            });
        }
    }, {
        key: 'searchMovies',
        value: function searchMovies(event) {
            var _this4 = this;

            this.updateState({
                search: event.target.value,
                next_page: 0,
                movies: []
            }, function () {
                _this4.fetchNextPage(++_this4.requestNum);
            });
        }
    }, {
        key: 'cleanSearch',
        value: function cleanSearch() {
            this.searchMovies({
                target: {
                    value: ''
                }
            });
        }
    }, {
        key: 'addMovie',
        value: function addMovie(movie) {
            var _this5 = this;

            var movies = this.state.movies;
            fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'api-key': sessionStorage.getItem('key'),
                    'auth-token': sessionStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(movie)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                movies.push(data);

                _this5.updateState({
                    movies: movies
                });
            });
        }
    }, {
        key: 'editMovie',
        value: function editMovie(movie) {
            var _this6 = this;

            this.state.editing.add(movie._id);
            this.setState(this.state);

            var movies = this.state.movies;
            var id = movie._id;
            delete movie._id;
            var index = movies.findIndex(function (m) {
                return id == m._id;
            });

            fetch('/api/movies/' + id, {
                method: 'PUT',
                headers: {
                    'api-key': sessionStorage.getItem('key'),
                    'auth-token': sessionStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(movie)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                movies[index] = data;
                _this6.state.editing.delete(data._id);

                _this6.updateState({
                    movies: movies
                });
            });
        }
    }, {
        key: 'deleteMovie',
        value: function deleteMovie(id) {
            var _this7 = this;

            this.state.deleting.add(id);
            this.setState(this.state);

            var movies = this.state.movies;
            var index = movies.findIndex(function (movie) {
                return id == movie._id;
            });

            fetch('/api/movies/' + id, {
                method: 'DELETE',
                headers: {
                    'api-key': sessionStorage.getItem('key'),
                    'auth-token': sessionStorage.getItem('token')
                }
            }).then(function (response) {
                if (response.status == 204) {

                    movies.splice(index, 1);
                    _this7.state.deleting.delete(id);
                    _this7.updateState({
                        movies: movies
                    });
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchNextPage(this.requestNum);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'input-group my-2' },
                    React.createElement(
                        'div',
                        { className: 'input-group-prepend' },
                        React.createElement(
                            'span',
                            { className: 'input-group-text border-0', id: 'icon-search' },
                            React.createElement(
                                'svg',
                                { xmlns: 'http://www.w3.org/2000/svg', width: '16', height: '16', fill: 'currentColor', className: 'bi bi-search', viewBox: '0 0 16 16' },
                                React.createElement('path', { d: 'M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' })
                            )
                        )
                    ),
                    React.createElement('input', { type: 'text',
                        className: 'form-control border-0',
                        placeholder: 'Search',
                        'aria-label': 'Search',
                        'aria-describedby': 'icon-search',
                        value: this.state.search,
                        onChange: this.searchMovies }),
                    React.createElement(
                        'div',
                        { className: 'input-group-append', id: 'button-addon4' },
                        React.createElement(
                            'button',
                            { className: 'btn btn-light', onClick: this.cleanSearch, type: 'button' },
                            React.createElement(
                                'svg',
                                { xmlns: 'http://www.w3.org/2000/svg', width: '16', height: '16', fill: 'currentColor', className: 'bi bi-x-lg', viewBox: '0 0 16 16' },
                                React.createElement('path', { d: 'M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z' })
                            )
                        )
                    )
                ),
                React.createElement(ModalMovie, { type: 'Add', action: this.addMovie }),
                this.state.movies.length == 0 && !this.state.loading ? React.createElement(
                    'h5',
                    { className: 'text-white' },
                    'No movies match the search.'
                ) : this.state.movies.map(function (movie) {
                    return React.createElement(
                        'div',
                        { key: 'wrapper' + movie._id },
                        React.createElement(MovieInfo, { key: movie._id,
                            movie: movie,
                            'delete': _this8.deleteMovie,
                            deleting: _this8.state.deleting.has(movie._id),
                            editing: _this8.state.editing.has(movie._id) }),
                        React.createElement(ModalMovie, { key: 'modal' + movie._id, id: movie._id, type: 'Edit', action: _this8.editMovie, movie: movie })
                    );
                }),
                this.state.loading ? React.createElement(Spinner, null) : '',
                this.state.next_page !== null && !this.state.loading ? React.createElement(
                    'div',
                    { className: 'container-fluid pt-5' },
                    React.createElement(
                        'button',
                        { className: 'btn btn-light', onClick: this.fetchNextPage },
                        'Load more'
                    )
                ) : ''
            );
        }
    }]);

    return MovieList;
}(React.Component);