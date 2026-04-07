console.log("Welcome to Mackayla's Portfolio!");

const projectData = [
  {
    title: "Escape Video Game",
    summary:
      "Senior capstone dungeon crawler featuring procedural generation, multiplayer lobby support, and Agile sprint planning in Jira.",
    tech: "C++ | Unreal Engine 5 | Jira",
    repo: "https://github.com/mackaylarodriguez",
    slides: [
      { label: "Gameplay Demo", className: "project-media-game" },
      { label: "Lobby Screen", className: "project-media-game-alt" },
      { label: "Dungeon View", className: "project-media-game-detail" }
    ]
  },
  {
    title: "Team Hub Application",
    summary:
      "Team-focused application designed to help users stay organized, collaborate more easily, and keep shared project information in one central place.",
    tech: "Web App | Collaboration | Team Workflow",
    repo: "https://github.com/mackaylarodriguez",
    slides: [
      { label: "Team Dashboard", className: "project-media-team" },
      { label: "Task Board", className: "project-media-team-alt" },
      { label: "Shared Workspace", className: "project-media-team-detail" }
    ]
  },
  {
    title: "Business Solutions Prototypes",
    summary:
      "End-to-end internship projects exploring automation, process improvement, and AI-supported workflows for practical business use cases.",
    tech: "AI Solutions | Automation | Data Analysis",
    repo: "https://github.com/mackaylarodriguez",
    slides: [
      { label: "AI Workflow Build", className: "project-media-ai" },
      { label: "Automation Flow", className: "project-media-ai-alt" },
      { label: "Project Output", className: "project-media-ai-detail" }
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

  const renderFeaturedProject = () => {
    const project = projectData[currentProjectIndex];
    const coverSlide = project.slides[0];

    featuredSlides.innerHTML = `
      <div class="featured-project-slide project-frame ${coverSlide.className} is-active">
        <span>${coverSlide.label}</span>
      </div>
    `;

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
      .map(
        (slide, index) => `
          <div class="project-gallery-slide project-frame ${slide.className}${index === gallerySlideIndex ? " is-active" : ""}">
            <span>${slide.label}</span>
          </div>
        `
      )
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
