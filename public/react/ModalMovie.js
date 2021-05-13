"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalMovie = function (_React$Component) {
    _inherits(ModalMovie, _React$Component);

    function ModalMovie(props) {
        _classCallCheck(this, ModalMovie);

        var _this = _possibleConstructorReturn(this, (ModalMovie.__proto__ || Object.getPrototypeOf(ModalMovie)).call(this, props));

        _this.key = _this.props.id;
        _this.type = _this.props.type;
        _this.action = _this.props.action;
        _this.movie = _this.props.movie || {};
        _this.submitForm = _this.submitForm.bind(_this);
        return _this;
    }

    _createClass(ModalMovie, [{
        key: 'submitForm',
        value: function submitForm(event) {
            event.preventDefault();
            var movie = this.buildMovie();

            this.action(movie);
            $('#movie' + this.type + (this.key || '')).modal('hide');
            if (this.type === 'Add') {
                this.clearForm();
            }
        }
    }, {
        key: 'buildMovie',
        value: function buildMovie() {
            return {
                _id: this.movie ? this.movie._id : undefined,
                title: $('#movieTitle' + this.type + (this.key || '')).val(),
                description: $('#movieDescription' + this.type + (this.key || '')).val(),
                image: $('#movieImage' + this.type + (this.key || '')).val(),
                trailer: $('#movieTrailer' + this.type + (this.key || '')).val(),
                thumbnail: $('#movieThumbnail' + this.type + (this.key || '')).val()
            };
        }
    }, {
        key: 'clearForm',
        value: function clearForm() {
            $('#movieTitle' + this.type + (this.key || '')).val('');
            $('#movieDescription' + this.type + (this.key || '')).val('');
            $('#movieImage' + this.type + (this.key || '')).val('');
            $('#movieTrailer' + this.type + (this.key || '')).val('');
            $('#movieThumbnail' + this.type + (this.key || '')).val('');
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'modal fade', id: 'movie' + this.type + (this.key || ''), tabIndex: '-1', 'aria-hidden': 'true' },
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
                                this.type,
                                ' Movie'
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
                            { onSubmit: this.submitForm },
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
                                    React.createElement('input', { type: 'text',
                                        className: 'form-control',
                                        id: 'movieTitle' + this.type + (this.key || ''),
                                        required: true,
                                        defaultValue: this.movie.title || '' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'movieDescription' },
                                        'Description'
                                    ),
                                    React.createElement('input', { type: 'text',
                                        className: 'form-control',
                                        id: 'movieDescription' + this.type + (this.key || ''),
                                        required: true,
                                        defaultValue: this.movie.description || '' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'movieImage' },
                                        'Image'
                                    ),
                                    React.createElement('input', { type: 'url',
                                        className: 'form-control',
                                        id: 'movieImage' + this.type + (this.key || ''),
                                        required: true,
                                        defaultValue: this.movie.image || '' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'movieTrailer' },
                                        'Trailer'
                                    ),
                                    React.createElement('input', { type: 'url',
                                        className: 'form-control',
                                        id: 'movieTrailer' + this.type + (this.key || ''),
                                        required: true,
                                        defaultValue: this.movie.trailer || '' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'movieThumbnail' },
                                        'Thumbnail'
                                    ),
                                    React.createElement('input', { type: 'url',
                                        className: 'form-control',
                                        id: 'movieThumbnail' + this.type + (this.key || ''),
                                        required: true,
                                        defaultValue: this.movie.thumbnail || '' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'modal-footer' },
                                React.createElement(
                                    'button',
                                    { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
                                    'Cancel'
                                ),
                                React.createElement(
                                    'button',
                                    { type: 'submit', className: 'btn btn-primary' },
                                    this.type,
                                    ' Movie'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ModalMovie;
}(React.Component);