"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovieInfo = function (_React$Component) {
    _inherits(MovieInfo, _React$Component);

    function MovieInfo(props) {
        _classCallCheck(this, MovieInfo);

        var _this = _possibleConstructorReturn(this, (MovieInfo.__proto__ || Object.getPrototypeOf(MovieInfo)).call(this, props));

        _this.movie = _this.props.movie;
        _this.delete = _this.delete.bind(_this);
        return _this;
    }

    _createClass(MovieInfo, [{
        key: "delete",
        value: function _delete() {
            this.props.delete(this.movie._id);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.editing) {
                return React.createElement(
                    "div",
                    { className: "p-3 my-1" },
                    React.createElement(
                        "p",
                        null,
                        "Editing"
                    ),
                    React.createElement(Spinner, null)
                );
            }

            if (this.props.deleting) {
                return React.createElement(
                    "div",
                    { className: "p-3 my-1" },
                    React.createElement(
                        "p",
                        null,
                        "Deleting"
                    ),
                    React.createElement(Spinner, null)
                );
            }

            return React.createElement(
                "div",
                { className: "rounded-lg bg-light text-dark p-3 my-1" },
                React.createElement(
                    "h3",
                    null,
                    this.movie.title
                ),
                React.createElement(
                    "p",
                    null,
                    this.movie.description
                ),
                React.createElement(
                    "p",
                    null,
                    "Image:",
                    React.createElement(
                        "a",
                        { href: this.movie.image, className: "btn btn-link", target: "_blank" },
                        this.movie.image
                    )
                ),
                React.createElement(
                    "p",
                    null,
                    "Trailer:",
                    React.createElement(
                        "a",
                        { href: this.movie.trailer, className: "btn btn-link", target: "_blank" },
                        this.movie.trailer
                    )
                ),
                React.createElement(
                    "p",
                    null,
                    "Thumbnail:",
                    React.createElement(
                        "a",
                        { href: this.movie.thumbnail, className: "btn btn-link", target: "_blank" },
                        this.movie.thumbnail
                    )
                ),
                React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "button",
                        { className: "btn btn-warning mr-2", "data-toggle": "modal", "data-target": "#movieEdit" + this.movie._id },
                        "Edit"
                    ),
                    React.createElement(
                        "button",
                        { className: "btn btn-danger ", "data-toggle": "modal", "data-target": "#confirmDelete" + this.movie._id },
                        "Delete"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "modal fade", id: "confirmDelete" + this.id, tabIndex: "-1", "aria-labelledby": "confirmDeleteLabel" + this.id, "aria-hidden": "true" },
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
                                    { className: "modal-title", id: "confirmDeleteLabel" + this.id },
                                    "Are you sure you want to delete this?"
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
                                    "p",
                                    null,
                                    "The movie ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        this.movie.title
                                    ),
                                    " will be deleted."
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "This action is permanent and cannot be undone."
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "modal-footer" },
                                React.createElement(
                                    "button",
                                    { type: "button", className: "btn btn-secondary", "data-dismiss": "modal" },
                                    "Cancel"
                                ),
                                React.createElement(
                                    "button",
                                    { type: "button", className: "btn btn-danger", onClick: this.delete, "data-dismiss": "modal" },
                                    "Delete"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MovieInfo;
}(React.Component);