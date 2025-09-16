const style = document.querySelector("#style")

if(localStorage.getItem("DarkModeOn")){
    style.setAttribute("href", "darkMode.css")
} else {
    style.setAttribute("href", "style.css");
}

function handleDarkModeBtn(event){
    event.preventDefault()

    if (style.getAttribute("href") === "style.css") {
        style.setAttribute("href", "darkMode.css");
        localStorage.setItem("DarkModeOn", 1)
    } else {
        style.setAttribute("href", "style.css");
        localStorage.removeItem("DarkModeOn")
    }
}