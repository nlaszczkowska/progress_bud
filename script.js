document.addEventListener("DOMContentLoaded", function() {
  const isHomePage = window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/";
  Promise.all([
      new Promise(resolve => {
          if (!isHomePage) {
              fetch("header.html")
                  .then(response => response.text())
                  .then(data => {
                      document.getElementById("header").innerHTML = data;
                      resolve();
                  });
          } else {
              resolve();
          }
      }),
      fetch("footer.html")
          .then(response => response.text())
          .then(data => document.getElementById("footer").innerHTML = data)
  ]).then(() => {
      highlightActiveLink();
  });
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
              if (entry.intersectionRatio > 0) {
                  entry.target.classList.add("in-view");
              } else {
                  entry.target.classList.remove("in-view");
              }
          });
      },
      { threshold: 0, rootMargin: "0px 0px -50px 0px" }
  );
  document.querySelectorAll(
      ".hero-content, .hero-about-content, .services, .services-vertical, .gallery, .company-info, .crew-base, .subpage-title, .equipment, .projects, .certificates, .contact"
  ).forEach(section => {
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
function highlightActiveLink() {
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "") {
      currentPage = "index.html";
  }
  const allLinks = document.querySelectorAll(".nav-links a, .footer-links a");
  allLinks.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
      }
  });
  const container = document.querySelector(".nav-links-container");
  if (container) {
      const activeHeaderLink = document.querySelector(".nav-links a.active");
      if (activeHeaderLink) {
          const containerRect = container.getBoundingClientRect();
          const linkRect = activeHeaderLink.getBoundingClientRect();
          const left = linkRect.left - containerRect.left;
          const width = linkRect.width;
          container.style.setProperty("--line-left", left + "px");
          container.style.setProperty("--line-width", width + "px");
      }
  }
}
