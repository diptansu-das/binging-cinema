let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');
let dropdownDiv=document.querySelector("#myDropdown12")

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

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 5,
        },
    },
});

// document.querySelector("MovieBtn").addEventListener("click", () => {


//     const API_URl1 = `https://api.themoviedb.org/3/discover/movie?with_genres=10749&primary_release_year=2022&api_key=594c8f852d2f55546b5698acac88ae46&page=1`
//     changeTheDom(API_URl1);
// });



window.onload = () => {
    // let year = Math.floor(Math.random() * 20);
    // let page = Math.floor(Math.random() * 50) + 1;
    // if (year <= 9) {
    //     const API_URl1 = `https://api.themoviedb.org/3/discover/tv?with_genres=10749&primary_release_year=200${year}&api_key=594c8f852d2f55546b5698acac88ae46&page=${page}`
    //     changeTheDom(API_URl1)
    // }
    // else {

    //     const API_URl1 = `https://api.themoviedb.org/3/discover/tv?with_genres=10749&primary_release_year=20${year}&api_key=594c8f852d2f55546b5698acac88ae46&page=${page}`
    //     changeTheDom(API_URl1)
    // }

    let page_value = Math.floor(Math.random() * 50) + 1;
    const Url1 = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=594c8f852d2f55546b5698acac88ae46&page=${page_value}`
    changeTheDom(Url1)
};

let x = {};

function changeTheDom(url1) {
    const main = document.getElementById('main')
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    // const url1 = `https://api.themoviedb.org/3/discover/tv?with_genres=10749&primary_release_year=20012&api_key=594c8f852d2f55546b5698acac88ae46&page=1`
    getMovies(url1)

    async function getMovies(url) {
        const res = await fetch(url)
        const data = await res.json()
        x = data.results;
        // console.log(x);
        showMovies(x);
    }

    function getClassByrate(vote) {
        if (vote >= 8) {
            return 'blue'
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
            const { name, poster_path, vote_average } = element

            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${name}" onerror="this.src='images/error.png'"  onclick="pop(${index})" >
             <div class="movie-info">
                 <h3>${name}</h3>
                 <span class="${getClassByrate(vote_average)}">${vote_average}</span>
                 <!-- favorite button -->
                 <button class="favourite-movie" id="eye-${index}" onclick="addFavoriteItem(${index})">
                 <div style="display:none;" id="count-${index}">1</div>
                 <i class="fa fa-eye" aria-hidden="true"></i></button>  
           </div>`

            main.appendChild(movieEl)

        })
    }

}
let movie_dir = [];

function getDirector(index) {
    let dirName = "UnKnown";
    // const new_url = `https://api.themoviedb.org/3/movie/${x[index].id}/credits?api_key=594c8f852d2f55546b5698acac88ae46&language=en-US`

    // async function getMoviesForDirector(new_url) {
    //     const result = await fetch(new_url)
    //     const credit_data = await result.json()
    //     movie_dir = credit_data.crew

    // }
    // getMoviesForDirector(new_url)
    
    // movie_dir.forEach((element) => {
    //     const { job, name } = element
    //     if (job == "Director") {
    //         dirName = name
    //     }
    // })
    return dirName;
}

function pop(index) {
    console.log(x[index].id)
    const lightbox = document.getElementById('lightbox')
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    const Tool = document.createElement('div')
    lightbox.innerHTML = ''
    Tool.classList.add('popup')
    Tool.setAttribute("id", "popup");
    let dirName = " ";
    const new_url = `https://api.themoviedb.org/3/tv/${x[index].id}/credits?api_key=594c8f852d2f55546b5698acac88ae46&language=en-US`

    async function getExecutive(new_url) {
        const result = await fetch(new_url)
        const credit_data = await result.json()
        movie_crew = credit_data.crew
        movie_crew.forEach((element) => {
            const { job, name } = element
            if (job == "Executive Producer") {
                dirName+= name+" "
            }
            if (job == "Director") {
                dirName+= name+" "
            }
            if(job=="Series Director"){
                dirName+=name+" "
            }
        })
        Tool.innerHTML = ` <div class="card" >
        <div class="movie-poster">
        <img  id="moviePosterAfter" src="${IMG_PATH + x[index].poster_path}" height="233px" >
          <div class="theImages1">
           <a onClick=getMydate()><i class="fa fa-heart" aria-hidden="true"></i></a>
           <a onClick=getMydate1()><i class="fa fa-bookmark" aria-hidden="true"></i></a>
           <a onClick=getMydate2()><i class="fa fa-eye" aria-hidden="true"></i></a>
          </div>
        </div>
        <div class="movie-details">
          <div class="movie-title">
            <h3>${x[index].name}</h3>
            
          </div>
          <div class="director-wrap">
            <p class="director">Created By:<span style="text-decoration:underline"> ${dirName} </span></p>
            <img src= "${getStar(x[index].vote_average)}" > 
            
          </div>
          <div class="overview-wrap">
            <p class="overview">${x[index].overview}</p>
          </div>
          
          <div class="more-details">
            <h4 class="genre">${getGenre(x[index].genre_ids)}</h4>
            <h4 class="release-date">${getDate(x[index].first_air_date)}</h4>
            <h4 class="genre">English</h4>
         </div>  
         
         
         
         <a href="content_profile.html" class="btn btn-primary btn-lg disabled nextloadHtml" tabindex="-1" role="button" aria-disabled="true">Primary link</a>
         
        </div>
      </div>`;
    
    
        lightbox.appendChild(Tool)
        let movie_id=x[index].id;
    
        localStorage.setItem('profileID',movie_id);
        // console.log(localStorage.getItem('profileID'));
        const backbox = document.getElementById('background')
        backbox.setAttribute("style", `background-image: url('${IMG_PATH + x[index].backdrop_path}'),url('images/load.png')`);
        document.getElementById("background").style.filter = " brightness(65%)";
    
        document.getElementById('blackOverlay').style.display = 'block';
        document.getElementById('popup').style.display = 'block';
        document.getElementById('background').style.display = 'block';


    }
    getExecutive(new_url)

}

function getGenre(genre) {
    let text1 = "Genre - ";

    genre.forEach(function (value) {

        let G = Return(value)
        text1 = text1 + G + " "
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
    return result

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

function getMydate(){
    console.log("favourite is clicked")
}
function getMydate1(){
    console.log("Watchlist is clicked")
}
function getMydate2(){
    console.log("Watched is clicked")
}




var counter = 1
function addFavoriteItem(index) {
    
    var computedStyle = window.getComputedStyle(dropdownDiv, null); 
    var visiblityValue = computedStyle.getPropertyValue("visibility")
    console.log(visiblityValue)
    if (visiblityValue == "hidden") {
        alert("Please login to add "+x[index].name+" to your watchlist")
    }
    else{

        console.log("before for " + counter )
        let element = document.getElementById('eye-' + index).getElementsByClassName("fa")[0]
        let count=document.getElementById('count-'+index)
        let countV=count.innerText
        console.log("countV"+countV)
        if (counter & countV) 
        {
            element.classList.remove("fa-eye")
        element.classList.add("fa-eye-slash")
        console.log("counterer= " + counter )
        count.innerHTML="0"
        console.log(count.innerHTML)
        const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
        const movie = x.find(item => item.id === Number(x[index].id))
        list.push(movie)
        localStorage.setItem('favoriteMovies', JSON.stringify(list))
        window.dispatchEvent( new Event('storage') )
    }
    else {
        count.innerHTML="1"
        console.log(count.innerHTML)
        element.classList.remove("fa-eye-slash")
        element.classList.add("fa-eye")
        console.log("counterer in else" + counter)
        const moive = JSON.parse(localStorage.getItem('favoriteMovies')) || []
        const mIndex = moive.findIndex(element => element.id === Number(x[index].id))
        moive.splice(mIndex,1)
        localStorage.setItem('favoriteMovies', JSON.stringify(moive))
        window.dispatchEvent( new Event('storage') )
    }
    }
}
// add filter values

let dateDropdown = document.getElementById('date-dropdown');

let currentYear = new Date().getFullYear();
let earliestYear = 1970;

while (currentYear >= earliestYear) {
    let dateOption = document.createElement('option');
    dateOption.text = currentYear;
    dateOption.value = currentYear;
    dateDropdown.add(dateOption);
    currentYear -= 1;
}
const Genre_Map = new Map();
// Genre_Map.set('Action', 28);
// Genre_Map.set('Adventure', 12);
Genre_Map.set('All Genre',10751)
Genre_Map.set('Animation', 16);
Genre_Map.set('Crime', 80);
Genre_Map.set('Comedy', 35);
Genre_Map.set('Documentary ', 99);
Genre_Map.set('Drama', 18);
Genre_Map.set('Family', 10751);
// Genre_Map.set('Fantasy', 14);
Genre_Map.set('History', 36);
// Genre_Map.set('Horror', 27);
// Genre_Map.set('Music  ', 10402);
Genre_Map.set('Mystery', 9648);
Genre_Map.set('Romance', 10749);
// Genre_Map.set('Science Fiction', 878);
// Genre_Map.set('TV Movie', 10770);
Genre_Map.set('Thriller', 53);
Genre_Map.set('War', 10752);
Genre_Map.set('Western', 37);

let genreDropdown = document.getElementById('genre-dropdown');
for (const [key] of Genre_Map) {
    let genreOption = document.createElement('option');
    genreOption.text = key;
    genreDropdown.add(genreOption);
}

document.getElementById("date-dropdown").addEventListener("click", () => {

    // document.getElementById('search-value').value = ''

    let page_number = 1;
    let gerneInput = document.getElementById("genre-dropdown").value;
    let genre_key = Genre_Map.get(gerneInput);
    let dateInput = document.getElementById("date-dropdown").value || 2022;
    console.log("date is clicked with date " + dateInput + "page" + page_number + "genre" + genre_key);
    const API_URl = `https://api.themoviedb.org/3/discover/tv?with_genres=${genre_key}&first_air_date_year=${dateInput}&sort_by=popularity.${getsort()}&api_key=594c8f852d2f55546b5698acac88ae46&page=${page_number}`
    console.log(API_URl)
    changeTheDom(API_URl)


});
document.getElementById("genre-dropdown").addEventListener("click", () => {
    // document.getElementById('search-value').value = ''
    let page_number = 1;
    let gerneInput = document.getElementById("genre-dropdown").value;
    let genre_key = Genre_Map.get(gerneInput);
    let dateInput = document.getElementById("date-dropdown").value || 2022;
    console.log("date is clicked with date " + dateInput + "page" + page_number + "genre" + genre_key);
    const API_URl = `https://api.themoviedb.org/3/discover/tv?with_genres=${genre_key}&first_air_date_year=${dateInput}&sort_by=popularity.${getsort()}&api_key=594c8f852d2f55546b5698acac88ae46&page=${page_number}`
    console.log(API_URl)
    changeTheDom(API_URl)

});

document.getElementById('search-value').addEventListener("input", function () {
    let inputValue = document.getElementById('search-value').value;
    console.log(inputValue)
    const API_URl = `https://api.themoviedb.org/3/search/tv?api_key=594c8f852d2f55546b5698acac88ae46&query=${inputValue}`
    changeTheDom(API_URl)
});
document.getElementById("sort-dropdown").addEventListener("click", () => {

    let page_number = 1;
    let gerneInput = document.getElementById("genre-dropdown").value;
    let genre_key = Genre_Map.get(gerneInput);
    let dateInput = document.getElementById("date-dropdown").value || 2022;
    console.log("date is clicked with date " + dateInput + "page" + page_number + "genre" + genre_key);
    const API_URl = `https://api.themoviedb.org/3/discover/tv?with_genres=${genre_key}&first_air_date_year=${dateInput}&sort_by=popularity.${getsort()}&api_key=594c8f852d2f55546b5698acac88ae46&page=${page_number}`
    console.log(API_URl)
    changeTheDom(API_URl)

});

function getsort(){
    let inputValue1 = document.getElementById('sort-dropdown').value;
    if(inputValue1 =="A-Z"){
        return 'asc'
    }
    else if(inputValue1 =="Z-A"){
        return 'desc'
    }
    else
    return 'desc'
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