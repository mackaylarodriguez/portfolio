console.log("Welcome to Mackayla's Portfolio!");

const projectCarousel = document.querySelector("[data-project-carousel]");

if (projectCarousel) {
  projectCarousel.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();
      projectCarousel.scrollBy({
        left: event.deltaY,
        behavior: "smooth"
      });
    },
    { passive: false }
  );
}

const slideShows = document.querySelectorAll("[data-slide-show]");

slideShows.forEach((slideShow) => {
  const slides = Array.from(slideShow.querySelectorAll(".project-slide"));
  const previousButton = slideShow.querySelector(".slide-arrow-left");
  const nextButton = slideShow.querySelector(".slide-arrow-right");

  if (!slides.length || !previousButton || !nextButton) {
    return;
  }

  let currentIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));

  if (currentIndex < 0) {
    currentIndex = 0;
    slides[0].classList.add("is-active");
  }

  const showSlide = (nextIndex) => {
    slides[currentIndex].classList.remove("is-active");
    currentIndex = (nextIndex + slides.length) % slides.length;
    slides[currentIndex].classList.add("is-active");
  };

  previousButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });
});
