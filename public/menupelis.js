renderMovies()

async function fetchMovies() {
    let response = await fetch('/api/movies', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "api-key": sessionStorage.getItem('key'),
            "auth-token": sessionStorage.getItem('token'),
        }
    })

    return await response.json()
    

}

function movieToHtml(movie){
    return `<a href="/detallepelis.html"><img src="${movie.thumbnail}" alt=""></a>`
}

async function renderMovies(){
    let movies = await fetchMovies()

    for (let i= 0; i < movies.length; i++){
        //$('#carousel').append(movieToHtml(movies[i]))
        document.getElementById('carousel').insertAdjacentHTML("beforeend", movieToHtml(movies[i]));
    }
     
    document.getElementById('loading').remove()


}