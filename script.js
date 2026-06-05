console.log("Welcome to Mackayla's Portfolio!");

const projectData = [
  {
    title: "Mission Trip Management Portal",
    summary:
      "A full-stack web application for Let's Start Talking to manage participant applications, records, and workflows.",
    tech: "JavaScript (Next.js, React, Supabase, SQL)",
    repo: "https://github.com/mackaylarodriguez/lst-team-hub",
    cover: "projects/lst-team-hub/cover.png",
    slides: [
      { label: "My Trips", image: "projects/lst-team-hub/my-trips.png" },
      { label: "Trip Overview", image: "projects/lst-team-hub/trip-overview.png" },
      { label: "Staff Tasks", image: "projects/lst-team-hub/staff-tasks.png" }
    ]
  },
  {
    title: "IT Support Ticket Management System",
    summary:
      "A full-stack IT help desk app for tracking support tickets with authentication and CRUD operations.",
    tech: "C# (ASP.NET Core, SQL Server)",
    repo: "https://github.com/mackaylarodriguez/ITSupportTicketSystem",
    cover: "projects/it-support/cover.png",
    slides: [
      { label: "Ticket Dashboard", image: "projects/it-support/dashboard.png" },
      { label: "Create Ticket", image: "projects/it-support/create-ticket.png" },
      { label: "Edit Ticket", image: "projects/it-support/edit-ticket.png" }
    ]
  }
];

const projectsRoot = document.querySelector("[data-projects]");
const projectModal = document.querySelector("[data-project-modal]");

if (projectsRoot && projectModal) {
  const featuredSlides = projectsRoot.querySelector("[data-featured-slides]");
  const featuredTitle = projectsRoot.querySelector("[data-featured-title]");
  const featuredDescription = projectsRoot.querySelector("[data-featured-description]");
  const featuredTech = projectsRoot.querySelector("[data-featured-tech]");
  const featuredGithub = projectsRoot.querySelector("[data-featured-github]");
  const featuredDots = projectsRoot.querySelector("[data-featured-dots]");
  const featuredProject = projectsRoot.querySelector("[data-open-gallery]");
  const featuredNavButtons = Array.from(projectsRoot.querySelectorAll("[data-featured-direction]"));

  const galleryTitle = projectModal.querySelector("[data-gallery-title]");
  const galleryDescription = projectModal.querySelector("[data-gallery-description]");
  const gallerySlides = projectModal.querySelector("[data-gallery-slides]");
  const galleryThumbs = projectModal.querySelector("[data-gallery-thumbs]");
  const galleryNavButtons = Array.from(projectModal.querySelectorAll("[data-gallery-direction]"));
  const galleryCloseButtons = Array.from(projectModal.querySelectorAll("[data-close-gallery]"));

  let currentProjectIndex = 0;
  let gallerySlideIndex = 0;

  const renderSlideMarkup = (slide, slideClass, isActive) => {
    const activeClass = isActive ? " is-active" : "";

    if (slide.image) {
      return `
        <div class="${slideClass} project-frame project-frame-image${activeClass}">
          <img src="${slide.image}" alt="${slide.label}" loading="lazy" />
          <span>${slide.label}</span>
        </div>
      `;
    }

    return `
      <div class="${slideClass} project-frame ${slide.className}${activeClass}">
        <span>${slide.label}</span>
      </div>
    `;
  };

  const renderFeaturedProject = () => {
    const project = projectData[currentProjectIndex];

    featuredSlides.innerHTML = renderSlideMarkup(
      { label: project.title, image: project.cover },
      "featured-project-slide",
      true
    );

    featuredTitle.textContent = project.title;
    featuredDescription.textContent = project.summary;
    featuredTech.textContent = project.tech;
    featuredGithub.href = project.repo;
  };

  const renderFeaturedDots = () => {
    featuredDots.innerHTML = projectData
      .map(
        (project, index) => `
          <button
            class="featured-project-dot${index === currentProjectIndex ? " is-active" : ""}"
            type="button"
            data-dot-index="${index}"
            aria-label="Show ${project.title}"
          ></button>
        `
      )
      .join("");

    featuredDots.querySelectorAll("[data-dot-index]").forEach((dot) => {
      dot.addEventListener("click", () => {
        setCurrentProject(Number(dot.dataset.dotIndex));
      });
    });
  };

  const renderGallery = () => {
    const project = projectData[currentProjectIndex];

    galleryTitle.textContent = project.title;
    galleryDescription.textContent = project.summary;

    gallerySlides.innerHTML = project.slides
      .map((slide, index) => renderSlideMarkup(slide, "project-gallery-slide", index === gallerySlideIndex))
      .join("");

    galleryThumbs.innerHTML = project.slides
      .map(
        (slide, index) => `
          <button class="project-thumb${index === gallerySlideIndex ? " is-active" : ""}" type="button" data-thumb-index="${index}">
            ${slide.label}
          </button>
        `
      )
      .join("");

    galleryThumbs.querySelectorAll("[data-thumb-index]").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        gallerySlideIndex = Number(thumb.dataset.thumbIndex);
        renderGallery();
      });
    });
  };

  const setCurrentProject = (projectIndex) => {
    currentProjectIndex = (projectIndex + projectData.length) % projectData.length;
    renderFeaturedProject();
    renderFeaturedDots();
  };

  const openGallery = () => {
    gallerySlideIndex = 0;
    renderGallery();
    projectModal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    projectModal.hidden = true;
    document.body.style.overflow = "";
  };

  featuredNavButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const direction = Number(button.dataset.featuredDirection);
      setCurrentProject(currentProjectIndex + direction);
    });
  });

  featuredProject.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }

    openGallery();
  });

  featuredProject.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openGallery();
  });

  featuredGithub.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  galleryNavButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const direction = Number(button.dataset.galleryDirection);
      const slideCount = projectData[currentProjectIndex].slides.length;

      gallerySlideIndex = (gallerySlideIndex + direction + slideCount) % slideCount;
      renderGallery();
    });
  });

  galleryCloseButtons.forEach((button) => {
    button.addEventListener("click", closeGallery);
  });

  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      closeGallery();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (projectModal.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeGallery();
      return;
    }

    if (event.key === "ArrowLeft") {
      gallerySlideIndex =
        (gallerySlideIndex - 1 + projectData[currentProjectIndex].slides.length) %
        projectData[currentProjectIndex].slides.length;
      renderGallery();
    }

    if (event.key === "ArrowRight") {
      gallerySlideIndex =
        (gallerySlideIndex + 1) % projectData[currentProjectIndex].slides.length;
      renderGallery();
    }
  });

  setCurrentProject(0);
}
