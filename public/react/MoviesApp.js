"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var MoviesApp = function (_React$Component) {
    _inherits(MoviesApp, _React$Component);

    function MoviesApp(props) {
        _classCallCheck(this, MoviesApp);

        var _this = _possibleConstructorReturn(this, (MoviesApp.__proto__ || Object.getPrototypeOf(MoviesApp)).call(this, props));

        _this.state = {
            movies: [],
            next_page: 0,
            loadingMore: false,
            search: ''
        };

        _this.requestNum = 0;

        _this.fetchNextPage = _this.fetchNextPage.bind(_this);
        _this.fetchMovies = _this.fetchMovies.bind(_this);
        _this.searchMovies = _this.searchMovies.bind(_this);
        _this.cleanSearch = _this.cleanSearch.bind(_this);
        return _this;
    }

    _createClass(MoviesApp, [{
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
                fetch('/api/movies?page=' + _this2.state.next_page + '&query=' + _this2.state.search, {
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
                loadingMore: true
            });

            this.fetchMovies().then(function (data) {
                if (_this3.requestNum != requestNum) return;

                _this3.updateState({
                    movies: _this3.state.movies.concat(data.movies),
                    next_page: data.next_page,
                    loadingMore: false
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
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchNextPage(this.requestNum);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            return React.createElement(
                'div',
                { className: 'container text-white pb-5' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-lg-6 col-md-4 col-12' },
                        React.createElement(
                            'h1',
                            { className: 'm-0' },
                            'Movies'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-12 col-lg-6 col-md-8' },
                        React.createElement(
                            'div',
                            { className: 'input-group' },
                            React.createElement(
                                'div',
                                { className: 'input-group-prepend' },
                                React.createElement(
                                    'span',
                                    { className: 'input-group-text text-white bg-dark border-0', id: 'icon-search' },
                                    React.createElement(
                                        'svg',
                                        { xmlns: 'http://www.w3.org/2000/svg', width: '16', height: '16', fill: 'currentColor', className: 'bi bi-search', viewBox: '0 0 16 16' },
                                        React.createElement('path', { d: 'M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' })
                                    )
                                )
                            ),
                            React.createElement('input', { type: 'text',
                                className: 'form-control bg-dark border-0 text-white',
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
                                    { className: 'btn btn-dark border-0 ', onClick: this.cleanSearch, type: 'button' },
                                    React.createElement(
                                        'svg',
                                        { xmlns: 'http://www.w3.org/2000/svg', width: '16', height: '16', fill: 'currentColor', className: 'bi bi-x-lg', viewBox: '0 0 16 16' },
                                        React.createElement('path', { d: 'M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z' })
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement('hr', null),
                this.state.movies.map(function (movie) {
                    return React.createElement(MovieThumbnail, { key: movie._id, movie: movie });
                }),
                this.state.loadingMore ? React.createElement(Spinner, null) : '',
                this.state.next_page !== null && !this.state.loadingMore ? React.createElement(
                    'div',
                    { className: 'container-fluid pt-5' },
                    React.createElement(
                        'button',
                        { className: 'btn btn-light', onClick: function onClick() {
                                return _this5.fetchNextPage(++_this5.requestNum);
                            } },
                        'Load more'
                    )
                ) : ''
            );
        }
    }]);

    return MoviesApp;
}(React.Component);

var domContainer = document.getElementById('movies-container');
ReactDOM.render(e(MoviesApp), domContainer);