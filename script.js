document.addEventListener("DOMContentLoaded", function() {
  const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

  if (!isHomePage) {
      fetch("header.html")
          .then(response => response.text())
          .then(data => document.getElementById("header").innerHTML = data);
  }

  fetch("footer.html")
      .then(response => response.text())
      .then(data => document.getElementById("footer").innerHTML = data);

  const galleryItems = document.querySelectorAll(".gallery-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (
      galleryItems.length > 0 &&
      lightbox &&
      lightboxImg &&
      closeBtn &&
      prevBtn &&
      nextBtn
  ) {
      let currentIndex = 0;
      const images = Array.from(galleryItems).map(item => item.src);

      galleryItems.forEach((item, index) => {
          item.addEventListener("click", function() {
              currentIndex = index;
              lightboxImg.src = images[currentIndex];
              lightbox.style.display = "flex";
          });
      });

      closeBtn.addEventListener("click", function() {
          lightbox.style.display = "none";
      });

      prevBtn.addEventListener("click", function() {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          lightboxImg.src = images[currentIndex];
      });

      nextBtn.addEventListener("click", function() {
          currentIndex = (currentIndex + 1) % images.length;
          lightboxImg.src = images[currentIndex];
      });

      lightbox.addEventListener("click", function(event) {
          if (event.target === lightbox) {
              lightbox.style.display = "none";
          }
      });
  }

  const observer = new IntersectionObserver(
      entries => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add("in-view");
              } else {
                  entry.target.classList.remove("in-view");
              }
          });
      },
      {
          threshold: 0.1,
          rootMargin: "0px 0px -100px 0px"
      }
  );

  document.querySelectorAll(".hero-content, .hero-about-content, .services, .gallery")
  .forEach(section => {
    console.log("Observing:", section);
    observer.observe(section);
  });
});

function toggleMenu() {
  let menu = document.querySelector(".nav-links-container");
  if (!menu) {
      menu = document.querySelector(".nav-links-cont");
  }
  if (menu) {
      menu.classList.toggle("show");
  }
  document.body.classList.toggle("no-scroll");
}
