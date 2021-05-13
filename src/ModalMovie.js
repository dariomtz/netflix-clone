"use strict";

class ModalMovie extends React.Component {
    constructor(props){
        super(props);
        this.key = this.props.id;
        this.type = this.props.type;
        this.action = this.props.action;
        this.movie = this.props.movie || {};
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(event){
        event.preventDefault();
        const movie = this.buildMovie();

        this.action(movie);
        $(`#movie${ this.type }${ this.key || '' }`).modal('hide');
        this.clearForm();
    }

    buildMovie(){
        return {
            id: this.movie ? this.movie.id : undefined,
            title: $(`#movieTitle${ this.type }${ this.key || '' }`).val(),
            description: $(`#movieDescription${ this.type }${ this.key || '' }`).val(),
            image: $(`#movieImage${ this.type }${ this.key || '' }`).val(),
            trailer: $(`#movieTrailer${ this.type }${ this.key || '' }`).val(),
            thumbnail: $(`#movieThumbnail${ this.type }${ this.key || '' }`).val(),
        }
    }

    clearForm(){
        $(`#movieTitle${ this.type }${ this.key || '' }`).val('');
        $(`#movieDescription${ this.type }${ this.key || '' }`).val('');
        $(`#movieImage${ this.type }${ this.key || '' }`).val('');
        $(`#movieTrailer${ this.type }${ this.key || '' }`).val('');
        $(`#movieThumbnail${ this.type }${ this.key || '' }`).val('');
    }

    render(){
        return (
            <div className="modal fade" id={`movie${ this.type }${ this.key || '' }`} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    
                    <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{ this.type } Movie</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form onSubmit={this.submitForm}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="movieTitle">Movie title</label>
                                <input type="text" 
                                        className="form-control" 
                                        id={`movieTitle${ this.type }${ this.key || '' }`} 
                                        required
                                        defaultValue={ this.movie.title || '' }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="movieDescription">Description</label>
                                <input type="text" 
                                        className="form-control" 
                                        id={`movieDescription${ this.type }${ this.key || '' }`} 
                                        required
                                        defaultValue={ this.movie.description || '' }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="movieImage">Image</label>
                                <input type="url" 
                                        className="form-control" 
                                        id={`movieImage${ this.type }${ this.key || '' }`} 
                                        required
                                        defaultValue={ this.movie.image || '' }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="movieTrailer">Trailer</label>
                                <input type="url" 
                                        className="form-control" 
                                        id={`movieTrailer${ this.type }${ this.key || '' }`} 
                                        required
                                        defaultValue={ this.movie.trailer || '' }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="movieThumbnail">Thumbnail</label>
                                <input type="url" 
                                        className="form-control" 
                                        id={`movieThumbnail${ this.type }${ this.key || '' }`} 
                                        required
                                        defaultValue={ this.movie.thumbnail || '' }/>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary">
                                { this.type } Movie
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}