"use strict";

const e = React.createElement;

class LikeButton extends React.Component {
  render() {
    return (
        <div>
            <h1>Pantalla de creadores</h1>
            <p>Pantalla donde se puedan añadir, editar y borrar películas que aparecerán en el menú de películas.</p>
        </div>   
    );
  }
}

const domContainer = document.getElementById('creators-container');
ReactDOM.render(e(LikeButton), domContainer);
