
console.log("working");
// let profile_container=document.querySelector(".profile-container")

let getMovieID = localStorage.getItem('profileID');
console.log(getMovieID);
const main = document.getElementById('profile-container')
getMovieDetails(getMovieID);


function getMovieDetails(movieid) {
    const profile_url = `https://api.themoviedb.org/3/movie/${movieid}?api_key=594c8f852d2f55546b5698acac88ae46`;
    let M;

    getProfile(profile_url)

    async function getProfile(url) {
        const res = await fetch(url)
        const data = await res.json()
        showProfile(data);
    }

}

// function showProfile(M){
//     const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

//     profile_container.innerHTML=`<div class="movie-profile">
//     <div class="profile-poster">
//         <img src="https://image.tmdb.org/t/p/w1280/u2HrA8BMvvHURz5mVOIe9EM1zGx.jpg alt="">
//     </div>
//     <div class="profile-details">
//         <h3 class="profile-title"></h3>

//         <div class="profile-details-wrap">
//             <p class="profile-director">Directed By <span> Marc Webb</span> </p>
//             <p class="profile-description">Tom, Greeting-Card Writer And Hopeless Romantic, Is Caught Completely Off-Guard When His Girlfriend, Summer, Suddenly Dumps Him. He Reflects On Their 500 Days Together To Try To Figure Out Where Their Love Affair Went Sour, And In Doing So, Tom Rediscovers His True Passions In Life.
//             </p>
//             <div class="more-profile-details">
//                     <h4 class="profile-genre">Comedy,Drama,Romance</h4>
//                     <h4 class="profile-release-date"> 17/07/2009</h4>
//                     <h4 class="profile-genre">Language -English</h4>
//                 <br>
//             </div>
//         </div>
//     </div>
//     <div class="cast-crew">
//         <p class="profile-director">Cast: <span> Joseph Gordon-Levitt, Zooey Deschanel </span> </p>
//     </div> `;
// }

function showProfile(movies) {
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    main.innerHTML = ''
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie-profile')
    // let movieElBefore = window.getComputedStyle(movieEl,"::before");
    // // console.log(movieElBefore.width);
    // movieElBefore.backgroundImage="url(`${IMG_PATH + movies.backdrop_path}`),url('images/load.png')"

    // // movieEl.setAttribute("style", `background-image: url('${IMG_PATH + movies.backdrop_path}'),url('images/load.png')`)
    movieEl.innerHTML = `
    <div class="movie-profile">
    <div class="profile-left">
        <div class="profile-poster">
            <img src="${IMG_PATH + movies.poster_path}">
            <div class="profile-buttons">
                <a><i class="fa fa-heart" aria-hidden="true"></i></a>
                <a><i class="fa fa-bookmark" aria-hidden="true"></i></a>
                <a><i class="fa fa-eye" aria-hidden="true"></i></a>
            </div>
            <div class="stream-app">
                <h2>Streaming On</h2>
                <h3>Disney+</h3>
            </div>
        </div>
    </div>
    <div class=" profile-details">
        <h3 class="profile-title">${movies.title}
        </h3>
        <h4 class="tagline">${movies.tagline}</h4>
        <div class="profile-details-wrap">
             <p class="profile-description">${movies.overview}</p>
            <div class="more-profile-details">
                <div class="genres">
                    <h3>Genre:</h3>
                    <div class="genreList">
                        <h4>${movies.genres[0].name} </h4>
                        <h4>${movies.genres[1].name} </h4>
                        <h4>${movies.genres[2].name} </h4>
                    </div>
                </div>
                <div class="profile-release-date">
                    <h3>Released On:</h3>
                    <h4>${movies.release_date}</h4>
                </div>
                <div class="profile-language">
                    <h3>Language:</h3>
                    <h4>${movies.spoken_languages[0].english_name}</h4>
                </div>
                <br>
            </div>
            <div class="profile-rating-money">
                <div class="profile-money">
                    <div class="profile-runtime">
                        <h3>Runtime:</h3>
                        <h4>${movies.runtime}mins</h4>
                    </div>
                    <div class="profile-budget">
                        <h3>Budget:</h3>
                        <h4>${movies.budget}</h4>
                    </div>
                    <div class="profile-revenue">
                        <h3>Revenue:</h3>
                        <h4>${movies.revenue}</h4>
                    </div>
                </div>
                <div class="profile-rating">
                    <div class="binging-rating">
                        <img src="/images/binging_cinema.png" alt="">
                        <h2>7/10</h2>
                    </div>
                    <div class="imdb-rating">
                        <img src="/images/imdb-logo-transparent.png" alt="">
                        <h2>7.9/10</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`

    main.appendChild(movieEl)


}
