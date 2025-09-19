const mainWrapper = document.querySelector("#mainWrapper")
const mainHeader = document.querySelector("#mainHeader")
const baseImgUrl = "https://image.tmdb.org/t/p/w500"

let mainPages = 1

const mainObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            mainPages++
            mainPage(mainPages)
        }
    })
},{
    threshold: 1.0
})

function mainPage(mainPages){
    const movieHeader = /*html*/ `
            <h1>MyMovies</h1>
            <button id="darkModeBtn"><div></div></button>
    `
    mainHeader.insertAdjacentHTML("beforeend", movieHeader)

    const main = /*html*/ `
        <section class="nowShowingSec">
            <div class="nowShowingTitle">
                <h2>Now Showing</h2>
                <button>See more</button>
            </div>
            <div class="movieDisplay"></div>
        </section>
        <section class="popularSec">
            <div class="popularTitle">
                <h2>Popular</h2>
                <button>See more</button>
            </div>
            <div class="popularDisplay"></div>
        </section>
    `
    mainWrapper.insertAdjacentHTML("beforeend", main)

    fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${mainPages}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then((respone) => respone.json())
    .then((movies) => {displayMovies(movies)})

    function displayMovies(movies){
        const movieContent = /*html*/`
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
        `
        mainWrapper.querySelector(".movieDisplay").insertAdjacentHTML("beforeend", movieContent)

        let obeserveMovie = document.querySelector(".movieDisplay a:nth-last-child(2)")
        mainObserver.disconnect(obeserveMovie)
        mainObserver.observe(obeserveMovie)

        displayPMovies

        const darkModeBtn = mainHeader.querySelector("#darkModeBtn")
        darkModeBtn.addEventListener("click", handleDarkModeBtn)
    }
}

mainPage(mainPages)