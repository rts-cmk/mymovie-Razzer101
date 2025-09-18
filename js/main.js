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
                        <a href="/details.html?id=${movie.id}">
                            <figure>
                                <img src="${baseImgUrl + movie.poster_path}" alt="${movie.title} (Banner)">
                            </figure>
                            <h3>${movie.title}</h3>
                            <p><span>&#9733</span> ${movie.vote_average.toFixed(1)}/10 IMDb</p>
                        </a>
                    `
                    }).join("")
                }
            </div>
        </section>
        <section class="popularSec"></section>
    `
    mainWrapper.insertAdjacentHTML("beforeend", movieContent)

    displayPMovies()

    const darkModeBtn = mainHeader.querySelector("#darkModeBtn")
    darkModeBtn.addEventListener("click", handleDarkModeBtn)
}