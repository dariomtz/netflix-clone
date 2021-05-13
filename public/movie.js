function getMovieId(){
    return window.location.href.split('/').pop();
}

async function fetchMovie(id){
    let response = await fetch(`/api/movies/${ id }`,{
        headers: {
            'api-key': sessionStorage.getItem('key'),
            'auth-token': sessionStorage.getItem('token'),
        },
    });
    
    if(response.status != 200){
        return null;
    }

    return await response.json();
}

async function renderMovie(){
    let movie = await fetchMovie(getMovieId());
    
    if(!movie){
        deleteSpinner();
        notFound();
        return;
    }

    $('#title').html(movie.title);
    $('#description').html(movie.description);
    $('#play').attr('href', movie.trailer);
    $('#image').attr('src', movie.image);
    deleteSpinner();
    $('#detail').removeClass('d-none');
}

function deleteSpinner(){
    $('#spinner').remove();
}

function notFound(){
    $('#container').append('<h1>404 Not found </h1>');
}


renderMovie();