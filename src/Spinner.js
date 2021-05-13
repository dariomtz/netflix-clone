"use strict";

function Spinner(){
    return (
        <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}