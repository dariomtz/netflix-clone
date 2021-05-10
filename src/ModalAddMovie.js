"use strict";

class ModalAddMovie extends React.Component {
    render(){
        return (
            <div className="modal fade" id="addMovie" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Movie</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div class="form-group">
                            <label for="movieTitle">Movie title</label>
                            <input type="text" class="form-control" id="movieTitle" aria-describedby="emailHelp"/>
                        </div>
                        <div class="form-group">
                            <label for="movieDescription">Description</label>
                            <input type="text" class="form-control" id="movieDescription" />
                        </div>
                        <div class="form-group">
                            <label for="movieImage">Image</label>
                            <input type="url" class="form-control" id="movieImage" />
                        </div>
                        <div class="form-group">
                            <label for="movieTrailer">Trailer</label>
                            <input type="url" class="form-control" id="movieTrailer" />
                        </div>
                        <div class="form-group">
                            <label for="movieThumbnail">Thumbnail</label>
                            <input type="url" class="form-control" id="movieThumbnail" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Add Movie</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}