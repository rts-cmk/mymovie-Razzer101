function displayPMovies(popularMovies){
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
                        <div class="popularInfo">
                            <h3>${popularMovie.title}</h3>
                            <p><span>&#9733</span> ${popularMovie.vote_average}/10 IMDb</p>
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
                        </div>
                    </article>
                `
                }).join("")
            }
        </div>
    `

    popularSec.insertAdjacentHTML("beforeend", popularContent)
}