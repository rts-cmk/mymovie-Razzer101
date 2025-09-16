const darkModeList = document.querySelector("body")

if(localStorage.getItem("DarkMode")){
    darkModeList.classList.add("darkMode")
} else {
    darkModeList.classList.remove("darkMode")
}

function handleDarkModeBtn(){
    darkModeList.classList.toggle("darkMode")

    if (darkModeList.classList.contains("darkMode")) {
    localStorage.setItem("DarkMode", 1)
    } else {
    localStorage.removeItem("DarkMode")
}
}