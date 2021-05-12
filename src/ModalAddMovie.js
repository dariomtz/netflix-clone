"use strict";

class ModalAddMovie extends React.Component {
    constructor(props){
        super(props);

        this.addMovie = this.addMovie.bind(this);
    }

    addMovie(event){
        event.preventDefault();
        const movie = this.buildMovie();

        this.props.addMovie(movie);
        $('#addMovie').modal('hide');
        this.clearForm();
    }

    buildMovie(){
        return {
            id: this.props.movies+1,
            title: $('#movieTitle').val(),
            description: $('#movieDescription').val(),
            image: $('#movieImage').val(),
            trailer: $('#movieTrailer').val(),
            thumbnail: $('#movieThumbnail').val(),
        }
    }

    clearForm(){
        $('#movieTitle').val('');
        $('#movieDescription').val('');
        $('#movieImage').val('');
        $('#movieTrailer').val('');
        $('#movieThumbnail').val('');
    }

    render(){
        return (
            <div className="modal fade" id="addMovie" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    
                    <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Add Movie</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form onSubmit={this.addMovie}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="movieTitle">Movie title</label>
                                <input type="text" className="form-control" id="movieTitle" aria-describedby="emailHelp" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="movieDescription">Description</label>
                                <input type="text" className="form-control" id="movieDescription" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="movieImage">Image</label>
                                <input type="url" className="form-control" id="movieImage" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="movieTrailer">Trailer</label>
                                <input type="url" className="form-control" id="movieTrailer" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="movieThumbnail">Thumbnail</label>
                                <input type="url" className="form-control" id="movieThumbnail" required/>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">
                                Add Movie
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}