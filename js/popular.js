function displayPMovies(){
    fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
    })
    .then((respone) => respone.json())
    .then((popularMovies) => {
        console.log(popularMovies)
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
                        <a href="/details.html?id=${popularMovie.id}">
                            <figure>
                                <img src="${baseImgUrl + popularMovie.poster_path}" alt="${popularMovie.title} (Banner)">
                            </figure>
                            <div class="popularInfo">
                                <h3>${popularMovie.title}</h3>
                                <p class="rating"><span>&#9733</span> ${popularMovie.vote_average.toFixed(1)}/10 IMDb</p>
                                <ul>
                                    ${
                                        popularMovie.genre_ids.map((id)=>{
                                            return /*html*/`
                                            <li>
                                                ${genres.find(genre => genre.id == id).name}
                                            </li>
                                            `
                                        }).join("")
                                    }
                                </ul>
                                <p class="runtime" data-id="${popularMovie.id}"></p>
                            </div>
                        </a>
                    `
                    }).join("")
                }
            </div>
        `
        popularSec.insertAdjacentHTML("beforeend", popularContent)

        document.querySelectorAll(".runtime").forEach((elm) => {
            const elmId = elm.getAttribute("data-id")
            fetch(`https://api.themoviedb.org/3/movie/${elmId}`, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            .then((respone) => respone.json())
            .then((runtaimeData) => {elm.innerHTML = `&#x1F550;${Math.floor(runtaimeData.runtime / 60)}h ${Math.floor(runtaimeData.runtime % 60)}min`})
        })
})

}