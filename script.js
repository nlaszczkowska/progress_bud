document.addEventListener("DOMContentLoaded", function () {
    const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

    if (!isHomePage) {
        fetch("header.html")
            .then(response => response.text())
            .then(data => document.getElementById("header").innerHTML = data);
    }

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data);
});

function toggleMenu() { 
    let menu = document.querySelector('.nav-links-container')
     if (!menu) { 
        menu = document.querySelector('.nav-links-cont') 
    } 
     if (menu) { 
        menu.classList.toggle('show') 
    } 
    document.body.classList.toggle('no-scroll') 
}
