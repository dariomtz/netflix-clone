"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalAddMovie = function (_React$Component) {
    _inherits(ModalAddMovie, _React$Component);

    function ModalAddMovie() {
        _classCallCheck(this, ModalAddMovie);

        return _possibleConstructorReturn(this, (ModalAddMovie.__proto__ || Object.getPrototypeOf(ModalAddMovie)).apply(this, arguments));
    }

    _createClass(ModalAddMovie, [{
        key: "addMovie",
        value: function addMovie() {
            return new Promise(function (resolve) {});
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal fade", id: "addMovie", tabindex: "-1", "aria-hidden": "true" },
                React.createElement(
                    "div",
                    { className: "modal-dialog" },
                    React.createElement(
                        "div",
                        { className: "modal-content" },
                        React.createElement(
                            "div",
                            { className: "modal-header" },
                            React.createElement(
                                "h5",
                                { className: "modal-title" },
                                "Add Movie"
                            ),
                            React.createElement(
                                "button",
                                { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                                React.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-body" },
                            React.createElement(
                                "div",
                                { "class": "form-group" },
                                React.createElement(
                                    "label",
                                    { "for": "movieTitle" },
                                    "Movie title"
                                ),
                                React.createElement("input", { type: "text", "class": "form-control", id: "movieTitle", "aria-describedby": "emailHelp" })
                            ),
                            React.createElement(
                                "div",
                                { "class": "form-group" },
                                React.createElement(
                                    "label",
                                    { "for": "movieDescription" },
                                    "Description"
                                ),
                                React.createElement("input", { type: "text", "class": "form-control", id: "movieDescription" })
                            ),
                            React.createElement(
                                "div",
                                { "class": "form-group" },
                                React.createElement(
                                    "label",
                                    { "for": "movieImage" },
                                    "Image"
                                ),
                                React.createElement("input", { type: "url", "class": "form-control", id: "movieImage" })
                            ),
                            React.createElement(
                                "div",
                                { "class": "form-group" },
                                React.createElement(
                                    "label",
                                    { "for": "movieTrailer" },
                                    "Trailer"
                                ),
                                React.createElement("input", { type: "url", "class": "form-control", id: "movieTrailer" })
                            ),
                            React.createElement(
                                "div",
                                { "class": "form-group" },
                                React.createElement(
                                    "label",
                                    { "for": "movieThumbnail" },
                                    "Thumbnail"
                                ),
                                React.createElement("input", { type: "url", "class": "form-control", id: "movieThumbnail" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-footer" },
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-secondary", "data-dismiss": "modal" },
                                "Close"
                            ),
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-primary" },
                                "Add Movie"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ModalAddMovie;
}(React.Component);