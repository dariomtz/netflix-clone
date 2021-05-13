async function getMoviesE() {

    //let url = 'http://localhost:3000/api/movies'
    let response = await fetch('http://localhost:3000/api/movies/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            //"x-admin": sessionStorage.getItem('key'),
            //"x-auth": sessionStorage.getItem('token'),
            "x-admin": "QdD9HGrwr",
            "x-auth": "xsabDFIil/609c4f8f44546c998b3921c3",
        }
    })
    if (!response.ok) return console.log('Ha ocurrido un error');
    let movie = await response.json()
    console.log(movie)
    carousel.innerHTML += `
    <section class="main-container" >
      <div class="location" id="home">
          <h1 id="home">Ya jaló</h1>
          <div class="box">
            <a href=""><img src="${movie.thumbnail}" alt=""></a>
            <a href="detallepelis.html"><img src="https://img.nbc.com/sites/nbcunbc/files/images/2021/2/11/NewAmsterdam_S3-Logo-1920x1080.jpg" alt=""></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p3.PNG?raw=true" alt=""></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p4.PNG?raw=true" alt=""></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p5.PNG?raw=true" alt=""></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p6.PNG?raw=true" alt=""></a>
    
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p7.PNG?raw=true" alt=""></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p8.PNG?raw=true" alt=""></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p9.PNG?raw=true" alt=""></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p10.PNG?raw=true" alt=""></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p11.PNG?raw=true" alt=""></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p12.PNG?raw=true" alt=""></a>        
          </div>
      </div>
     `

}