"use strict";

class MovieInfo extends React.Component{
    constructor(props){
        super(props);
        this.movie = this.props.movie;
        this.id = this.props.id;

        this.delete = this.delete.bind(this);
    }

    delete(){
        this.props.delete(this.props.id);
    }

    render(){
        return (
            <div className="rounded-lg bg-light text-dark p-3 my-1">
                <h3>{ this.movie.title }</h3>
                <p>{ this.movie.description }</p>
                <p>
                    Image: 
                    <a href={ this.movie.image } className="btn btn-link" target="_blank">
                        { this.movie.image }
                    </a>
                </p>
                <p>
                    Trailer: 
                    <a href={ this.movie.trailer } className="btn btn-link" target="_blank">
                        { this.movie.trailer }
                    </a>
                </p>
                <p>
                    Thumbnail:
                    <a href={ this.movie.thumbnail } className="btn btn-link" target="_blank">
                        { this.movie.thumbnail }
                    </a>
                </p>
                <p>
                    <button className="btn btn-warning mr-2" data-toggle="modal" data-target={`#movieEdit${ this.id }`}>
                        Edit
                    </button>
                    <button className="btn btn-danger " data-toggle="modal" data-target={`#confirmDelete${ this.id }`}>
                        Delete
                    </button>
                </p>

                <div className="modal fade" id={`confirmDelete${ this.id }`} tabIndex="-1" aria-labelledby={`confirmDeleteLabel${ this.id }`} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`confirmDeleteLabel${ this.id }`}>Are you sure you want to delete this?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>The movie <strong>{ this.movie.title }</strong> will be deleted.</p>
                            <p>This action is permanent and cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={ this.delete } data-dismiss="modal">Delete</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}