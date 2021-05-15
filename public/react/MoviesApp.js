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
            loadingMore: false
        };

        _this.fetchNextPage = _this.fetchNextPage.bind(_this);
        _this.fetchMovies = _this.fetchMovies.bind(_this);
        return _this;
    }

    _createClass(MoviesApp, [{
        key: 'updateState',
        value: function updateState(newState) {
            var state = Object.assign({}, this.state);
            Object.assign(state, newState);
            this.setState(state);
        }
    }, {
        key: 'fetchMovies',
        value: function fetchMovies() {
            var _this2 = this;

            console.log(this.state.next_page);
            return new Promise(function (resolve) {
                fetch('/api/movies?page=' + _this2.state.next_page, {
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
        value: function fetchNextPage() {
            var _this3 = this;

            this.updateState({
                loadingMore: true
            });

            this.fetchMovies().then(function (data) {
                _this3.updateState({
                    movies: _this3.state.movies.concat(data.movies),
                    next_page: data.next_page,
                    loadingMore: false
                });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchNextPage();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'container text-white pb-5' },
                React.createElement(
                    'h1',
                    null,
                    'Movies'
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
                        { className: 'btn btn-light', onClick: this.fetchNextPage },
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