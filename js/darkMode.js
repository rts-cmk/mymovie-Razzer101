function handleDarkModeBtn(event){
    event.preventDefault()
    const style = document.querySelector("#style")
    if (style.getAttribute("href") === "style.css") {
        style.setAttribute("href", "darkMode.css");
    } else {
        style.setAttribute("href", "style.css");
    }
}