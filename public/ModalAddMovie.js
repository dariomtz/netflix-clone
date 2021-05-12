"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalAddMovie = function (_React$Component) {
    _inherits(ModalAddMovie, _React$Component);

    function ModalAddMovie(props) {
        _classCallCheck(this, ModalAddMovie);

        var _this = _possibleConstructorReturn(this, (ModalAddMovie.__proto__ || Object.getPrototypeOf(ModalAddMovie)).call(this, props));

        _this.addMovie = _this.addMovie.bind(_this);
        return _this;
    }

    _createClass(ModalAddMovie, [{
        key: 'addMovie',
        value: function addMovie(event) {
            event.preventDefault();
            var movie = this.buildMovie();

            this.props.addMovie(movie);
            $('#addMovie').modal('hide');
            this.clearForm();
        }
    }, {
        key: 'buildMovie',
        value: function buildMovie() {
            return {
                id: this.props.movies + 1,
                title: $('#movieTitle').val(),
                description: $('#movieDescription').val(),
                image: $('#movieImage').val(),
                trailer: $('#movieTrailer').val(),
                thumbnail: $('#movieThumbnail').val()
            };
        }
    }, {
        key: 'clearForm',
        value: function clearForm() {
            $('#movieTitle').val('');
            $('#movieDescription').val('');
            $('#movieImage').val('');
            $('#movieTrailer').val('');
            $('#movieThumbnail').val('');
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'modal fade', id: 'addMovie', tabIndex: '-1', 'aria-hidden': 'true' },
                React.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        React.createElement(
                            'div',
                            { className: 'modal-header' },
                            React.createElement(
                                'h5',
                                { className: 'modal-title' },
                                'Add Movie'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                                React.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '\xD7'
                                )
                            )
                        ),
                        React.createElement(
                            'form',
                            { onSubmit: this.addMovie },
                            React.createElement(
                                'div',
                                { className: 'modal-body' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'movieTitle' },
                                        'Movie title'
                                    ),
                                    React.createElement('input', { type: 'text', className: 'form-control', id: 'movieTitle', 'aria-describedby': 'emailHelp', required: true })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'movieDescription' },
                                        'Description'
                                    ),
                                    React.createElement('input', { type: 'text', className: 'form-control', id: 'movieDescription', required: true })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'movieImage' },
                                        'Image'
                                    ),
                                    React.createElement('input', { type: 'url', className: 'form-control', id: 'movieImage', required: true })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'movieTrailer' },
                                        'Trailer'
                                    ),
                                    React.createElement('input', { type: 'url', className: 'form-control', id: 'movieTrailer', required: true })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'movieThumbnail' },
                                        'Thumbnail'
                                    ),
                                    React.createElement('input', { type: 'url', className: 'form-control', id: 'movieThumbnail', required: true })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'modal-footer' },
                                React.createElement(
                                    'button',
                                    { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
                                    'Close'
                                ),
                                React.createElement(
                                    'button',
                                    { type: 'submit', className: 'btn btn-primary' },
                                    'Add Movie'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ModalAddMovie;
}(React.Component);