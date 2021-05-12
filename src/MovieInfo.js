"use strict";

function MovieInfo(props){

    return (
        <div className="rounded-lg bg-light text-dark p-3 my-1">
            <h3>{props.movie.title}</h3>
            <p>{props.movie.description}</p>
            <p>
                Image: <a href={props.movie.image} className="btn btn-link" target="_blank">{ props.movie.image }</a>
            </p>
            <p>
                Trailer: <a href={props.movie.trailer} className="btn btn-link" target="_blank">{ props.movie.trailer }</a>
            </p>
            <p>
                Thumbnail: <a href={props.movie.thumbnail} className="btn btn-link" target="_blank">{ props.movie.thumbnail }</a>
            </p>
            <p>
                <button className="btn btn-warning " data-toggle="modal" data-target={`#movieEdit${ props.id }`}>
                    Edit Movie
                </button>
            </p>
        </div>
    );
}