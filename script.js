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

const galleryItems = document.querySelectorAll('.gallery-item img')
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightbox-img')
const closeBtn = document.getElementById('close')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
let currentIndex = 0
const images = Array.from(galleryItems).map(item => item.src)
galleryItems.forEach((item, index) => {
  item.addEventListener('click', function () {
    currentIndex = index
    lightboxImg.src = images[currentIndex]
    lightbox.style.display = 'flex'
  })
})
closeBtn.addEventListener('click', function () {
  lightbox.style.display = 'none'
})
prevBtn.addEventListener('click', function () {
  currentIndex = (currentIndex - 1 + images.length) % images.length
  lightboxImg.src = images[currentIndex]
})
nextBtn.addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % images.length
  lightboxImg.src = images[currentIndex]
})
lightbox.addEventListener('click', function (event) {
  if (event.target === lightbox) {
    lightbox.style.display = 'none'
  }
})
