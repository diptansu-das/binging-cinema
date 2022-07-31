

let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
});




const mainFavorite = document.querySelector("#main-favourite")
const moive = JSON.parse(localStorage.getItem('favoriteMovies')) || []
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
showMovies(moive)
function getClassByrate(vote) {
    if (vote >= 8) {
        return 'green'
    }
    else if (vote >= 5) {
        return 'orange'
    }
    else {
        return 'red'
    }
}

function showMovies(movies) {
    mainFavorite.innerHTML = ''
    movies.forEach((element, index) => {
        const { name, title, poster_path, vote_average, id } = element

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
       <img src="${IMG_PATH + poster_path}" alt="${title}" onerror="this.src='images/error.png'"  onclick="pop(${index})" >
        <div class="movie-info">
            <h3>${title || name}</h3>
            <span class="${getClassByrate(vote_average)}">${vote_average}</span>
            <!-- favorite button -->
            <button class="favourite-movie" onclick=" deleteNote(${id})"
            >-</button>
        </div>`

        mainFavorite.appendChild(movieEl)

    })
}
// let x = {};
let movie_crew = [];
function pop(index) {
    const lightbox = document.getElementById('lightbox')
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    const Tool = document.createElement('div')
    lightbox.innerHTML = ''
    Tool.classList.add('popup')
    Tool.setAttribute("id", "popup");
    let dirName = "";
    const new_url = `https://api.themoviedb.org/3/movie/${moive[index].id}/credits?api_key=594c8f852d2f55546b5698acac88ae46&language=en-US `

    async function getMoviesForDirector(new_url) {
        const result = await fetch(new_url)
        const credit_data = await result.json()
        movie_crew = credit_data.crew
        movie_crew.forEach((element) => {
            const { job, name } = element
            if (job == "Director") {
                dirName += name + " "
            }
        })
        Tool.innerHTML = ` <div class="card" >
            <div class="movie-poster">
            <img  id="moviePosterAfter" src="${IMG_PATH + moive[index].poster_path}" height="233px" >
              <div class="theImages1">
               <a onClick=getMydate()><i class="fa fa-heart" aria-hidden="true"></i></a>
               <a onClick=getMydate1()><i class="fa fa-bookmark" aria-hidden="true"></i></a>
               <a onClick=getMydate2()><i class="fa fa-eye" aria-hidden="true"></i></a>
              </div>
            </div>
            <div class="movie-details">
              <div class="movie-title">
                <h3>${moive[index].title || moive[index].name}</h3>
                
              </div>
              <div class="director-wrap">
                <p class="director">Directed By:<span style="text-decoration:underline"> ${dirName} </span></p>
                <img src= "${getStar(moive[index].vote_average)}" > 
                
              </div>
              <div class="overview-wrap">
                <p class="overview">${moive[index].overview}</p>
              </div>
              
              <div class="more-details">
                <h4 class="genre">${getGenre(moive[index].genre_ids)}</h4>
                <h4 class="release-date">${getDate(moive[index].release_date || moive[index].first_air_date )}}</h4>
                <h4 class="genre">English</h4>
             </div>  
             
             
             
             <a href="content_profile.html" class="btn btn-primary btn-lg disabled nextloadHtml" tabindex="-1" role="button" aria-disabled="true">Primary link</a>
             
            </div>
          </div>`;


        lightbox.appendChild(Tool)
        let movie_id = moive[index].id;

        localStorage.setItem('profileID', movie_id);
        // console.log(localStorage.getItem('profileID'));
        const backbox = document.getElementById('background')
        backbox.setAttribute("style", `background-image: url('${IMG_PATH + moive[index].backdrop_path}'),url('images/load.png')`);
        document.getElementById("background").style.filter = " brightness(65%)";

        document.getElementById('blackOverlay').style.display = 'block';
        document.getElementById('popup').style.display = 'block';
        document.getElementById('background').style.display = 'block';


    }
    getMoviesForDirector(new_url)


}

function getGenre(genre) {
    let text1 = "Genre - ";

    genre.forEach(function (value) {

        let G = Return(value)
        text1 = text1 + G + "/"
    });
    return text1
}

function Return(value) {

    if (value == 10759)
        return 'Action & Adventure'
    else if (value == 16)
        return 'Animation'
    else if (value == 35)
        return 'Comedy'
    else if (value == 80)
        return 'Crime'
    else if (value == 99)
        return 'Documentary'
    else if (value == 18)
        return 'Drama'
    else if (value == 10751)
        return 'Family'
    else if (value == 10762)
        return 'Kids'
    else if (value == 9648)
        return 'Mystery'
    else if (value == 10763)
        return 'News'
    else if (value == 10764)
        return 'Reality'
    else if (value == 10765)
        return 'Sci-Fi & Fantasy'
    else if (value == 10766)
        return 'Soap'
    else if (value == 10767)
        return 'Talk'
    else if (value == 10768)
        return 'War & Politics'
    else if (value == 37)
        return 'Western'
    else if (value == 28)
        return 'Action'
    else if (value == 12)
        return 'Adventure'
    else if (value == 14)
        return 'Fantasy'
    else if (value == 36)
        return 'History'
    else if (value == 27)
        return 'Horror'
    else if (value == 10402)
        return 'Music'
    else if (value == 9648)
        return 'Mystery'
    else if (value == 10749)
        return 'Romance'
    else if (value == 878)
        return 'Science Fiction'
    else if (value == 10770)
        return 'TV Movie'
    else if (value == 53)
        return 'Thriller'
    else if (value == 10752)
        return 'War'
    else
        return ' '

}

function getDate(date) {


    const [year, month, day] = date.split('-');
    const result = [day, month, year].join('/');
    if (result)
        return result
    else
        return 'Not Defined'


}

function getStar(vote) {

    if (vote == 10)
        return 'https://i.postimg.cc/WbHSJjsy/Material-10.png'
    else if (vote > 8 && vote < 10)
        return 'https://i.postimg.cc/KvPqwCbp/Material-8-5.png'
    else if (vote == 8)
        return 'https://i.postimg.cc/PrT9XdSn/Material-8.png'
    else if (vote > 6 && vote < 8)
        return 'https://i.postimg.cc/dV4BKy0g/Material-6-5.png'
    else if (vote == 6)
        return 'https://i.postimg.cc/65LrKv3t/Material-6.png'
    else if (vote > 4 && vote < 6)
        return 'https://i.postimg.cc/ncjLY8y5/Material-4-5.png'
    else if (vote == 4)
        return 'https://i.postimg.cc/vmqrxwFB/Material-4.png'
    else if (vote > 2 && vote < 4)
        return 'https://i.postimg.cc/SRyYgZp5/Material-2-5.png'
    else if (vote == 2)
        return 'https://i.postimg.cc/y8Fgz4Y5/Material-2.png'
    else if (vote > 0 && vote < 2)
        return 'https://i.postimg.cc/fW9B9MNy/Material-1-5.png'
    else
        return 'https://i.postimg.cc/8CbVDLy8/Material-0.png'

}
function closePopup() {

    document.getElementById('blackOverlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
    document.getElementById('background').style.display = 'none';
}




function deleteNote(id) {
    //   console.log("I am deleting", index);

    const moive = JSON.parse(localStorage.getItem('favoriteMovies')) || []

    const index = moive.findIndex(element => element.id === id)
    moive.splice(index, 1)
    localStorage.setItem('favoriteMovies', JSON.stringify(moive))
    window.dispatchEvent(new Event('storage'))
    showMovies(moive)
}
//toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}