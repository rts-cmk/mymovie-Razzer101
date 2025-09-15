function displayPMovies(popularMovies){
    fetch("https://api.themoviedb.org/3/genre/movie/list", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
    })
    .then((respone) => respone.json())
    .then((genres) => {console.log(genres)})
    const popularSec = document.querySelector(".popularSec")
    const popularContent = /*html*/ `
        <div class="popularTitle">
            <h2>Popular</h2>
            <button>See more</button>
        </div>
        <div class="popularDisplay">
            ${
                popularMovies.results.map((popularMovie) => {
                return /*html*/`
                    <article>
                        <figure>
                            <img src="${baseImgUrl + popularMovie.poster_path}" alt="${popularMovie.title} (Banner)">
                        </figure>
                        <div>
                            <h3>${popularMovie.title}</h3>
                            <p><span>&#9733</span> ${popularMovie.vote_average}/10 IMDb</p>
                        </div>
                    </article>
                `
                }).join("")
            }
        </div>
    `

    popularSec.insertAdjacentHTML("beforeend", popularContent)
}