"use strict";

function Spinner() {
    return React.createElement(
        "div",
        { className: "d-flex justify-content-center py-5" },
        React.createElement(
            "div",
            { className: "spinner-border text-light", role: "status" },
            React.createElement(
                "span",
                { className: "sr-only" },
                "Loading..."
            )
        )
    );
}