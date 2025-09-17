const detailsWrapper = document.querySelector("#detailsWrapper")
const baseImgUrl = "https://image.tmdb.org/t/p/w500"
let params = new URLSearchParams(window.location.search)
const id = params.get("id")

fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos`, {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
})
.then((respone) => respone.json())
.then((details) => {displayDetail(details)})

function displayDetail(details){
    console.log(details)
    const detailsContent = /*html*/ `
        <section class="trailerSec" style="background-image: url('${baseImgUrl + details.poster_path}');">
            <a class="backToMain" href="index.html">&#11104;</a>
            <a class="seeTrailer" href="https://www.youtube.com/watch?v=${details.videos.results[0].key}" >
                <div>
                    &#9654;
                </div>
                <p>Play Trailer</p>
            </a>
            <button id="darkModeBtn"><div class="btnInnerIcon"></div></button>
        </section>
        <section class="detailsSec">
            <article class="title">
                <h1>${details.title}</h1>
                <button>&#10084;</button>
            </article>
            <article class="content">
                <p class="rating"><span>&#9733</span>${details.vote_average.toFixed(1)}/10 IMDb</p>
                <ul>
                    ${
                        details.genres.map((genre)=>{
                            return /*html*/`
                                <li>${genre.name}</li>
                            `
                        }).join("")
                    }
                </ul>
                <div class="extraInfo">
                    <p>Length<span>${Math.floor(details.runtime / 60)}h ${Math.floor(details.runtime % 60)}min</span></p>
                    <p>Language<span>${details.spoken_languages[0].english_name}</span></p>
                </div>
                <div class="description">
                    <h2>Description</h2>
                    <p>${details.overview}</p>
                </div>
            </article>
        </section>
        <section class="cast">
            <article>
                <h2>Cast</h2>
                <button>See more</button>
            </article>
            <div>
                ${details.credits.cast.map((person) => {
                    return /*html*/ `
                    <figure>
                        <img src="${baseImgUrl + person.profile_path}" alt="${person.name}" alt="">
                        <figcaption>
                            ${person.name}
                        </figcaption>
                    </figure>
                    `
                }).join("")}    
            </div>
        </section>
    `
    detailsWrapper.insertAdjacentHTML("beforeend", detailsContent)
    const darkModeBtn = detailsWrapper.querySelector("#darkModeBtn")
    darkModeBtn.addEventListener("click", handleDarkModeBtn)
}