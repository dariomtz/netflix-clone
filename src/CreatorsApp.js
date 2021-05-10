"use strict";

const e = React.createElement;

class CreatorsApp extends React.Component {
  render() {
    return (
        <div className="container-fluid bg-danger p-4">
            <div className="d-flex justify-content-between">
                <h1 className="text-white">Movies</h1>
                <div className="p-2">
                    <button className="btn btn-light text-danger" data-toggle="modal" data-target="#addMovie">
                        <PlusSign/>
                        Add movie
                    </button>
                </div>
            </div>
            <ModalAddMovie/>
            <MovieList />
        </div>   
    );
  }
}

const domContainer = document.getElementById('creators-container');
ReactDOM.render(e(CreatorsApp), domContainer);
