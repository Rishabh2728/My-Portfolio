const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".navigation-menu");
const navbar = document.getElementById("navbar");
const revealItems = document.querySelectorAll(".reveal-item");
const typingElements = document.querySelectorAll(".typing-line");
const heroHello = document.getElementById("hero-hello");
const heroWork = document.getElementById("hero-work");
const heroBadge = document.querySelector(".hero-orbit-badge");
const badgeTextPath = document.querySelector(".hero-orbit-badge textPath");
const educationBar = document.querySelector(".edu-float");
const educationCounts = document.querySelectorAll(".edu-count");
const projectImages = document.querySelectorAll(".project-image");
const socialIcons = document.querySelector(".social-icons");
const pageLinks = document.querySelectorAll(".page-navigation");
const trackedSections = [
  { id: "home", element: document.getElementById("home") },
  { id: "about", element: document.getElementById("about") },
  { id: "education", element: document.querySelector(".edu-float") },
  { id: "skills", element: document.querySelector(".skills") },
  { id: "projects", element: document.getElementById("projects") },
  { id: "contact", element: document.getElementById("contact") },
].filter((section) => section.element);

function getIndiaGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(new Date())
  );

  if (hour < 12) {
    return "\u2600\uFE0F Good Morning";
  }

  if (hour < 17) {
    return "\uD83C\uDF24\uFE0F Good Afternoon";
  }

  return "\uD83C\uDF19 Good Evening";
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

if (heroHello) {
  const greetingSpan = heroHello.querySelector("span");
  if (greetingSpan) {
    greetingSpan.textContent = getIndiaGreeting();
  }
}

if (badgeTextPath) {
  badgeTextPath.textContent = "\u2726 I AM AVAILABLE \u2726 FOR FREELANCE";
}

if (projectImages.length) {
  projectImages.forEach((projectImage) => {
    projectImage.addEventListener("mousemove", (event) => {
      const rect = projectImage.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      projectImage.style.setProperty("--cursor-x", `${x}px`);
      projectImage.style.setProperty("--cursor-y", `${y}px`);
    });
  });
}

if (educationBar && educationCounts.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animateCount = (element) => {
    const target = Number(element.dataset.count || "0");
    const suffix = element.dataset.suffix || "";
    const decimals = Number.isInteger(target) ? 0 : String(target).split(".")[1].length;
    const duration = 2100;
    const startTime = performance.now();

    function updateCount(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * eased;
      const displayValue = decimals > 0 ? currentValue.toFixed(decimals) : Math.round(currentValue).toString();

      element.textContent = `${displayValue}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(updateCount);
        return;
      }

      element.textContent = `${target}${suffix}`;
    }

    window.requestAnimationFrame(updateCount);
  };

  if (prefersReducedMotion) {
    educationCounts.forEach((element) => {
      element.textContent = `${element.dataset.count || "0"}${element.dataset.suffix || ""}`;
    });
  } else {
    const educationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          educationCounts.forEach((element) => animateCount(element));
          educationObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.45,
      }
    );

    educationObserver.observe(educationBar);
  }
}

if (heroBadge) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    heroBadge.addEventListener("mouseenter", () => {
      heroBadge.classList.remove("is-returning");
      heroBadge.classList.remove("is-spinning");
      void heroBadge.offsetWidth;
      heroBadge.classList.add("is-spinning");
    });

    heroBadge.addEventListener("mouseleave", () => {
      heroBadge.classList.remove("is-spinning");
      heroBadge.classList.add("is-returning");
    });

    heroBadge.addEventListener("animationend", (event) => {
      if (event.animationName === "orbitBadgeSpin") {
        heroBadge.classList.remove("is-spinning");
      }

      if (event.animationName === "orbitBadgeReturn") {
        heroBadge.classList.remove("is-returning");
      }
    });
  }
}

if (typingElements.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    if (heroHello) {
      heroHello.classList.remove("hero-intro-hidden");
      heroHello.classList.add("hero-intro-visible");
    }

    typingElements.forEach((element) => {
      element.textContent = element.dataset.text || "";
    });

    if (heroWork) {
      heroWork.classList.remove("hero-intro-hidden");
      heroWork.classList.add("hero-intro-visible");
    }
  } else {
    typingElements.forEach((element) => {
      element.textContent = "";
    });

    if (heroHello) {
      window.setTimeout(() => {
        heroHello.classList.remove("hero-intro-hidden");
        heroHello.classList.add("hero-intro-visible");
      }, 180);
    }

    function typeLine(lineIndex) {
      if (lineIndex >= typingElements.length) {
        if (heroWork) {
          heroWork.classList.remove("hero-intro-hidden");
          heroWork.classList.add("hero-intro-visible");
        }
        return;
      }

      const currentLine = typingElements[lineIndex];
      const fullText = currentLine.dataset.text || "";
      let charIndex = 0;

      currentLine.classList.add("typing-active");

      function typeCharacter() {
        if (charIndex < fullText.length) {
          currentLine.textContent += fullText.charAt(charIndex);
          charIndex += 1;
          window.setTimeout(typeCharacter, 38);
          return;
        }

        currentLine.classList.remove("typing-active");
        window.setTimeout(() => typeLine(lineIndex + 1), 120);
      }

      typeCharacter();
    }

    window.setTimeout(() => typeLine(0), 700);
  }
}

if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
    if (socialIcons) {
      socialIcons.classList.toggle("active");
    }
  });

  document.querySelectorAll(".navigation-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      hamburger.classList.remove("active");
      if (socialIcons) {
        socialIcons.classList.remove("active");
      }
    });
  });
}

function updateNavbarState() {
  if (!navbar) {
    return;
  }

  if (window.scrollY > 12) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
}

updateNavbarState();
window.addEventListener("scroll", updateNavbarState);

function updateActiveNavLink() {
  let activeSectionId = "home";
  const targetLine = 160;

  trackedSections.forEach((section) => {
    const rect = section.element.getBoundingClientRect();
    if (rect.top <= targetLine && rect.bottom > targetLine) {
      activeSectionId = section.id;
    }
  });

  pageLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSectionId}`;
    link.classList.toggle("active", isActive);
  });
}

updateActiveNavLink();
window.addEventListener("scroll", updateActiveNavLink);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item) => observer.observe(item));
