"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var CreatorsApp = function (_React$Component) {
    _inherits(CreatorsApp, _React$Component);

    function CreatorsApp() {
        _classCallCheck(this, CreatorsApp);

        return _possibleConstructorReturn(this, (CreatorsApp.__proto__ || Object.getPrototypeOf(CreatorsApp)).apply(this, arguments));
    }

    _createClass(CreatorsApp, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "container-fluid bg-danger p-4" },
                React.createElement(
                    "div",
                    { className: "d-flex justify-content-between" },
                    React.createElement(
                        "h1",
                        { className: "text-white" },
                        "Movies"
                    ),
                    React.createElement(
                        "div",
                        { className: "p-2" },
                        React.createElement(
                            "button",
                            { className: "btn btn-light text-danger", "data-toggle": "modal", "data-target": "#movieAdd" },
                            React.createElement(PlusSign, null),
                            "Add movie"
                        )
                    )
                ),
                React.createElement(MovieList, null)
            );
        }
    }]);

    return CreatorsApp;
}(React.Component);

var domContainer = document.getElementById('creators-container');
ReactDOM.render(e(CreatorsApp), domContainer);