let params = new URLSearchParams(window.location.search)
const id = params.get("id")

fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
})
.then((respone) => respone.json())
.then((details) => {displayDetail(details)})

function displayDetail(details){
    console.log(details)
}