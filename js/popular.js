let pages = 1

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            pages++
            displayPMovies(pages)
        }
    })
},{
    threshold: 1.0
})

function displayPMovies(pages){
    const popularMoviesFetch = fetch(`https://api.themoviedb.org/3/movie/popular?page=${pages}`, {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
    })
    .then((respone) => respone.json())

    const genresFetch = fetch("https://api.themoviedb.org/3/genre/movie/list", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
    })
    .then((respone) => respone.json())

    Promise.all([popularMoviesFetch, genresFetch])
    .then(([popularMovies, genresData]) => {
        const genres = genresData.genres
        const popularDisplay = document.querySelector(".popularDisplay")
        const popularContent = /*html*/ `
                ${
                    popularMovies.results.map((popularMovie, index) => {
                    return /*html*/`
                        <a href="/details.html?id=${popularMovie.id}">
                            <figure>
                                <img src="${baseImgUrl + popularMovie.poster_path}" alt="${popularMovie.title} (Banner)">
                            </figure>
                            <div class="popularInfo">
                                <h3>
                                    ${popularMovie.title.length > 30 ? `${popularMovie.title.slice(0, 30)}...` : `${popularMovie.title}`}
                                </h3>
                                <p class="rating"><span>&#9733</span> ${popularMovie.vote_average.toFixed(1)}/10 IMDb</p>
                                <ul>
                                    ${
                                        popularMovie.genre_ids.slice(0,2).map((id)=>{
                                            return /*html*/`
                                            <li>
                                                ${genres.find(genre => genre.id == id).name}
                                            </li>
                                            `
                                        }).join("")
                                    }
                                    ${popularMovie.genre_ids.length > 2 ? `<li>+${popularMovie.genre_ids.length - 2}</li>` : ""}
                                </ul>
                                <p class="runtime" data-id="${popularMovie.id}"></p>
                            </div>
                        </a>
                    `
                    }).join("")
                }
        `
        popularDisplay.insertAdjacentHTML("beforeend", popularContent)

        document.querySelectorAll(".runtime").forEach((elm) => {
            const elmId = elm.getAttribute("data-id")
            fetch(`https://api.themoviedb.org/3/movie/${elmId}`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            .then((respone) => respone.json())
            .then((runtaimeData) => {elm.innerHTML = `
                &#x1F550;${Math.floor(runtaimeData.runtime / 60)}h ${Math.floor(runtaimeData.runtime % 60)}min
            `})
        })

        let obeservePMovie = document.querySelector(".popularDisplay a:nth-last-child(2)")
        observer.disconnect(obeservePMovie)
        observer.observe(obeservePMovie)

})
}

displayPMovies(pages)