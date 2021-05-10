"use strict";

function MovieInfo(props){
    return (
        <div className="rounded-lg bg-light text-dark p-3">
            <h3>{props.movie.title}</h3>
            <p>{props.movie.description}</p>
            <p>{props.movie.image}</p>
            <p>{props.movie.trailer}</p>
            <p>{props.movie.thumbnail}</p>
        </div>
    );
}