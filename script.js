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
