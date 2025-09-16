const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzkwOTRmNWRmM2EwNGM2MDY1ZjY4ZDc4NjNmM2JjZCIsIm5iZiI6MTc1NzkyMDc0Mi43NTcsInN1YiI6IjY4YzdiZGU2ZmUwZjM4MDdlZGNhNzM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cldE6JxLAbUYEXs3khu8N5TeX5FupWc3nEZDKu6IpGs"
const mainWrapper = document.querySelector("#mainWrapper")
const mainHeader = document.querySelector("#mainHeader")
const baseImgUrl = "https://image.tmdb.org/t/p/w500"

fetch("https://api.themoviedb.org/3/movie/now_playing", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
})
.then((respone) => respone.json())
.then((movies) => {displayMovies(movies)})

function displayMovies(movies){
    const movieHeader = /*html*/ `
            <h1>MyMovies</h1>
            <button id="darkModeBtn"><div></div></button>
    `
    mainHeader.insertAdjacentHTML("beforeend", movieHeader)

    const movieContent = /*html*/`
        <section class="nowShowingSec">
            <div class="nowShowingTitle">
                <h2>Now Showing</h2>
                <button>See more</button>
            </div>
            <div class="movieDisplay">
                ${
                    movies.results.map((movie) => {
                    return /*html*/`
                        <article>
                            <figure>
                                <img src="${baseImgUrl + movie.poster_path}" alt="${movie.title} (Banner)">
                            </figure>
                            <h3>${movie.title}</h3>
                            <p><span>&#9733</span> ${movie.vote_average}/10 IMDb</p>
                        </article>
                    `
                    }).join("")
                }
            </div>
        </section>
        <section class="popularSec"></section>
    `
    mainWrapper.insertAdjacentHTML("beforeend", movieContent)

    fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
    })
    .then((respone) => respone.json())
    .then((popularMovies) => {displayPMovies(popularMovies); console.log(popularMovies)})

    const darkModeBtn = mainHeader.querySelector("#darkModeBtn")
    darkModeBtn.addEventListener("click", handleDarkModeBtn)
}