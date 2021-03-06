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
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});



// document.querySelector("MovieBtn").addEventListener("click", () => {


//     const API_URl1 = `https://api.themoviedb.org/3/discover/movie?with_genres=10749&primary_release_year=2022&api_key=594c8f852d2f55546b5698acac88ae46&page=1`
//     changeTheDom(API_URl1);
// });



window.onload = () => {
    let year = Math.floor(Math.random() * 20);
    let page = Math.floor(Math.random() * 50) + 1;
    if (year <= 9) {
        const API_URl1 = `https://api.themoviedb.org/3/discover/movie?with_genres=10749&primary_release_year=200${year}&api_key=594c8f852d2f55546b5698acac88ae46&page=${page}`
        changeTheDom(API_URl1)
    }
    else {

        const API_URl1 = `https://api.themoviedb.org/3/discover/movie?with_genres=10749&primary_release_year=20${year}&api_key=594c8f852d2f55546b5698acac88ae46&page=${page}`
        changeTheDom(API_URl1)
    }
};

let x = {};

function changeTheDom(url1) {
    const main = document.getElementById('main')
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    // const url1 = `https://api.themoviedb.org/3/discover/movie?with_genres=10749&primary_release_year=20012&api_key=594c8f852d2f55546b5698acac88ae46&page=1`
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
        movies.forEach((element, index) => {
            const { title, poster_path, vote_average } = element

            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            movieEl.innerHTML = `
       <img src="${IMG_PATH + poster_path}" alt="${title}" onerror="this.src='images/error.png'"  onclick="pop(${index})" >
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByrate(vote_average)}">${vote_average}</span>
            <!-- favorite button -->
            <button class="favourite-movie" onclick="addFavoriteItem(${index})"
            >+</button>
        </div>`

            main.appendChild(movieEl)

        })
    }

}

function pop(index) {
    console.log(x[index])
    const lightbox = document.getElementById('lightbox')
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    const Tool = document.createElement('div')
    lightbox.innerHTML = ''
    Tool.classList.add('popup')
    Tool.setAttribute("id", "popup");
    Tool.innerHTML = ` <div class="card" >
    <div class="movie-poster">
    <img src="${IMG_PATH + x[index].poster_path}" height="233px">
    </div>
    <div class="movie-details">
      <div class="movie-title">
        
        <h3>${x[index].title}</h3>
      </div>
      
      <div class="overview-wrap">
        <p class="overview">${x[index].overview}</p>
        <br>
      </div>
      <div class="more-details">
        <h4 class="genre">${getGenre(x[index].genre_ids)}</h4>
        <h4 class="release-date"> Release Date -${getDate(x[index].release_date)}</h4>
        <h4 class="genre">Language -English</h4>
       <br>
      </div>
      <div class="binging-rating">
      <h4>Binging Cinema Rating</h4>
     <img src= "${getStar(x[index].vote_average)}" >
      </div>
    </div>
  </div>`;

    lightbox.appendChild(Tool)

    const backbox = document.getElementById('background')
    backbox.setAttribute("style", `background-image: url('${IMG_PATH + x[index].backdrop_path}'),url('images/load.png')`);


    document.getElementById('blackOverlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
    document.getElementById('background').style.display = 'block';


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

function addFavoriteItem(index) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movie = x.find(item => item.id === Number(x[index].id))
    // console.log(list)
    console.log(movie)
    if (list.some(item => item.id === Number(x[index].id))) {
        alert(`${movie.title} is already in your favorite list.`)
    } else {
        list.push(movie)
        //   alert(`Added ${movie.title} to your favorite list!`)
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(list))

}


// function displayDataList() {
//     const mainFavorite=document.querySelector("#main-favourite")
//     const data = localStorage.getItem('favoriteMovies') || []

//     mainFavorite.innerHTML = ''
//     const IMG_PATH1 = 'https://image.tmdb.org/t/p/w1280'
//     data.forEach((element, index) => {
//         const { title, poster_path, vote_average } = element
//         console.log("working")
//         const movieEl = document.createElement('div')
//         movieEl.classList.add('movie')
//         movieEl.innerHTML = `
//        <img src="${IMG_PATH1 + poster_path}" alt="" onerror="this.src='images/error.png'"  onclick="pop(${index})" >
//         <div class="movie-info">
//             <h3>${title}</h3>
//             <span class="${getClassByrate(vote_average)}">${vote_average}</span>
//             <!-- favorite button -->
//             <button class="favourite-movie" onclick="removeFavoriteItem(${index})" style="background-color=#000"
//             >X</button>
//         </div>`
//         mainFavorite.appendChild(movieEl)

//     })
//   }
  