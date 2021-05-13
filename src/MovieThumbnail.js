"use strict";

class MovieThumbnail extends React.Component {
    render(){
        return (
            <div className="d-inline-block" >
                <a href={`/movie/${this.props.movie._id}`}>
                    <img src={this.props.movie.thumbnail} width={`240px`} className="rounded-lg m-2" />
                </a>
            </div>
            
        );
    }
}