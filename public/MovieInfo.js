"use strict";

function MovieInfo(props) {

    return React.createElement(
        "div",
        { className: "rounded-lg bg-light text-dark p-3 my-1" },
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
            "Image: ",
            React.createElement(
                "a",
                { href: props.movie.image, className: "btn btn-link", target: "_blank" },
                props.movie.image
            )
        ),
        React.createElement(
            "p",
            null,
            "Trailer: ",
            React.createElement(
                "a",
                { href: props.movie.trailer, className: "btn btn-link", target: "_blank" },
                props.movie.trailer
            )
        ),
        React.createElement(
            "p",
            null,
            "Thumbnail: ",
            React.createElement(
                "a",
                { href: props.movie.thumbnail, className: "btn btn-link", target: "_blank" },
                props.movie.thumbnail
            )
        ),
        React.createElement(
            "p",
            null,
            React.createElement(
                "button",
                { className: "btn btn-warning ", "data-toggle": "modal", "data-target": "#movieEdit" + props.id },
                "Edit Movie"
            )
        )
    );
}