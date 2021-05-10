"use strict";

function MovieInfo(props) {
    return React.createElement(
        "div",
        { className: "rounded-lg bg-light text-dark p-3" },
        React.createElement(
            "h3",
            null,
            props.movie.title
        ),
        React.createElement(
            "p",
            null,
            props.movie.description
        ),
        React.createElement(
            "p",
            null,
            props.movie.image
        ),
        React.createElement(
            "p",
            null,
            props.movie.trailer
        ),
        React.createElement(
            "p",
            null,
            props.movie.thumbnail
        )
    );
}