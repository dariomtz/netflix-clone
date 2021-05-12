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
            movies: []
        };

        _this.addMovie = _this.addMovie.bind(_this);
        _this.editMovie = _this.editMovie.bind(_this);
        return _this;
    }

    _createClass(MovieList, [{
        key: "fetchMovies",
        value: function fetchMovies() {
            return new Promise(function (resolve) {
                resolve([{
                    "id": "1",
                    "title": "Peli chida",
                    "description": "ES una peli chida bien chida",
                    "image": "https://expressjs.com/en/guide/using-middleware.html",
                    "trailer": "https://expressjs.com/en/guide/using-middleware.html",
                    "thumbnail": "https://expressjs.com/en/guide/using-middleware.html"
                }]);
            });
        }
    }, {
        key: "addMovie",
        value: function addMovie(movie) {
            var movies = this.state.movies;
            movie.id = movies.length + 1;

            movies.push(movie);

            this.setState({
                movies: movies
            });
        }
    }, {
        key: "editMovie",
        value: function editMovie(movie) {
            var movies = this.state.movies;
            var index = movies.findIndex(function (m) {
                return movie.id == m.id;
            });
            movies[index] = movie;

            this.setState({
                movies: movies
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.fetchMovies().then(function (movies) {
                _this2.setState({
                    movies: movies
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(ModalMovie, { type: "Add", action: this.addMovie }),
                this.state.movies.map(function (movie) {
                    return React.createElement(
                        "div",
                        { key: "wrapper" + movie.id },
                        React.createElement(MovieInfo, { key: movie.id, id: movie.id, movie: movie }),
                        React.createElement(ModalMovie, { key: "modal" + movie.id, id: movie.id, type: "Edit", action: _this3.editMovie, movie: movie })
                    );
                })
            );
        }
    }]);

    return MovieList;
}(React.Component);