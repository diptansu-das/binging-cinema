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


videoBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('src');
        document.querySelector('#video-slider').src = src;
    });
});





window.onload = () => {

    // const API_URl1 = `https://api.themoviedb.org/3/trending/all/week?api_key=594c8f852d2f55546b5698acac88ae46`   for week
    const API_URl1 = `https://api.themoviedb.org/3/trending/all/day?api_key=594c8f852d2f55546b5698acac88ae46`
    // for day
    trengingDom(API_URl1)
    const API_URl2 = `https://api.themoviedb.org/3/discover/movie?with_genres=10749&primary_release_year=2020&api_key=594c8f852d2f55546b5698acac88ae46&page=1`
    popularDom(API_URl2)

};

function trengingDom(url1) {
    const main = document.getElementById('main')
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    getMovies(url1)

    async function getMovies(url) {
        const res = await fetch(url)
        const data = await res.json()
        x = data.results;
        showMovies(x);
    }
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
        main.innerHTML = ''
        movies.forEach((element) => {
            const { poster_path } = element
            const movieEl = document.createElement('div')
            movieEl.classList.add('cover-item')
            movieEl.setAttribute("style", `background-image: url("${IMG_PATH + poster_path} ")`);
            main.appendChild(movieEl)

        })
    }

}


function popularDom(url1) {
    const main = document.getElementById('main1')
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    getMovies(url1)

    async function getMovies(url) {
        const res = await fetch(url)
        const data = await res.json()
        x = data.results;
        showMovies(x);
    }

    function showMovies(movies) {
        main.innerHTML = ''
        movies.forEach((element) => {
            const { poster_path } = element
            const movieEl = document.createElement('div')
            movieEl.classList.add('cover-item')
            movieEl.setAttribute("style", `background-image: url("${IMG_PATH + poster_path} ")`);
            main.appendChild(movieEl)

        })
    }

}

function todayMovie() {
    console.log("todayss")
    const API_URl12 = `https://api.themoviedb.org/3/trending/all/day?api_key=594c8f852d2f55546b5698acac88ae46`
    trengingDom(API_URl12)
}
function thisWeekMovie() {
    console.log("this weel")
    const API_URl13 = `https://api.themoviedb.org/3/trending/all/week?api_key=594c8f852d2f55546b5698acac88ae46`
    trengingDom(API_URl13)
}
function streamingNow() {
    console.log("streaming ")
    const API_URl21 = `https://api.themoviedb.org/3/discover/movie?api_key=594c8f852d2f55546b5698acac88ae46&watch_region=US&with_watch_monetization_types=flatrate`
    popularDom(API_URl21)
}
function onTvNow() {
    console.log("on tv")
    const API_URl22 = `https://api.themoviedb.org/3/discover/tv?api_key=594c8f852d2f55546b5698acac88ae46&watch_region=US&with_watch_monetization_types=rent`
    popularDom(API_URl22)
}
function inThreatersNow() {
    const API_URl22 = `https://api.themoviedb.org/3/discover/movie?api_key=594c8f852d2f55546b5698acac88ae46&region=US&with_release_type=3|2`
    console.log("threaterss")
    popularDom(API_URl22)
}




//toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
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