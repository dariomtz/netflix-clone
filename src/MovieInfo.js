"use strict";

class MovieInfo extends React.Component{
    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete(){
        this.props.delete(this.props.movie._id);
    }

    render(){
        if(this.props.editing){
            return (
                <div className="text-white text-center p-5 my-1">
                    <h4>Editing</h4>
                    <Spinner />
                </div>
            );
        }

        if(this.props.deleting){
            return (
                <div className="text-white text-center p-5 my-1">
                    <h4>Deleting</h4>
                    <Spinner />
                </div>
            );
        }

        return (
            <div className="rounded-lg bg-light text-dark p-3 my-1">
                <h3>{ this.props.movie.title }</h3>
                <p>{ this.props.movie.description }</p>
                <p>
                    Image: 
                    <a href={ this.props.movie.image } className="btn btn-link" target="_blank">
                        { this.props.movie.image }
                    </a>
                </p>
                <p>
                    Trailer: 
                    <a href={ this.props.movie.trailer } className="btn btn-link" target="_blank">
                        { this.props.movie.trailer }
                    </a>
                </p>
                <p>
                    Thumbnail:
                    <a href={ this.props.movie.thumbnail } className="btn btn-link" target="_blank">
                        { this.props.movie.thumbnail }
                    </a>
                </p>
                <p>
                    <button className="btn btn-warning mr-2" data-toggle="modal" data-target={`#movieEdit${ this.props.movie._id }`}>
                        Edit
                    </button>
                    <button className="btn btn-danger " data-toggle="modal" data-target={`#confirmDelete${ this.props.movie._id }`}>
                        Delete
                    </button>
                </p>

                <div className="modal fade" id={`confirmDelete${ this.props.movie._id }`} tabIndex="-1" aria-labelledby={`confirmDeleteLabel${ this.props.movie._id }`} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`confirmDeleteLabel${ this.props.movie._id }`}>Are you sure you want to delete this?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>The movie <strong>{ this.props.movie.title }</strong> will be deleted.</p>
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