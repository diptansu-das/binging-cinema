
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
    movieEl.innerHTML = `
        <div class="profile-poster">
        <img src="${IMG_PATH + movies.poster_path}">
  </div>
   <div class=" profile-details">
        <h3 class="profile-title">${movies.title}</h3>

        <div class="profile-details-wrap">
            <p class="profile-director">Directed By <span> Marc Webb</span> </p>
            <p class="profile-description">${movies.overview}
            </p>
            <div class="more-profile-details">
                <h4 class="profile-genre">Comedy,Drama,Romance</h4>
                <h4 class="profile-release-date">${movies.release_date}</h4>
                <h4 class="profile-genre">Language -English</h4>
                <br>
            </div>
        </div>
    </div>/ <div class="cast-crew">
        <p class="profile-director">Cast: <span> Joseph Gordon-Levitt, Zooey Deschanel </span> </p>
    </div>
    `

    main.appendChild(movieEl)


}
