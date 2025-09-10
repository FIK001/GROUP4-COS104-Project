// Countdown Timer Functionality
function updateCountdown() {
  const targetDate = new Date("2026-01-19T00:00:00").getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  } else {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Button click handlers
document.querySelectorAll(".get-tickets-btn, .footer-btn").forEach((button) => {
  button.addEventListener("click", function () {
    // Add registration/signup functionality here
    console.log("Button clicked:", this.textContent);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".bg-video");
  if (video) {
    video.addEventListener("canplaythrough", () => {
      video.classList.add("loaded");
    });
  }
});

// Parralax Effect for Music Letters
// We will store the original transform for each element here.
const initialTransforms = new Map();

// This ensures the DOM is fully loaded before we try to access elements.
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".parallax-with-mouse");
  elements.forEach((element) => {
    // Get the computed style to read the original transform from the CSS
    const computedStyle = window.getComputedStyle(element);
    const originalTransform = computedStyle.transform;

    // Store the original transform. We need to check for 'none' because
    // the computed style will be 'none' if no transform is applied.
    initialTransforms.set(
      element,
      originalTransform !== "none" ? originalTransform : ""
    );
  });
});

// Parallax Effect for Music Letters
document.addEventListener("mousemove", (e) => {
  // Get the mouse position relative to the center of the window (-0.5 to 0.5)
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  const elements = document.querySelectorAll(".parallax-with-mouse");

  elements.forEach((element) => {
    const speed = element.getAttribute("data-speed");
    const rotateSpeed = element.getAttribute("data-rotate-speed");
    const originalTransform = initialTransforms.get(element);

    // Calculate the new parallax translation
    const offsetX = x * parseFloat(speed) * 40;
    const offsetY = y * parseFloat(speed) * 40;

    // Calculate the new dynamic rotation
    const rotation = x * parseFloat(rotateSpeed) * 5;

    // Combine the new parallax translation and rotation with the original transform.
    // The browser will apply all the transform functions together.
    element.style.transform = `rotate(${rotation}deg) translateX(${offsetX}px) translateY(${offsetY}px) ${originalTransform}`;
  });
});

// Loader Animation
function startLoader() {
  let counterElement = document.querySelector(".loading-counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;
    if (currentValue > 100) {
      currentValue = 100;
    }
    counterElement.textContent = currentValue + "%";

    let delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  }
  updateCounter();
}

startLoader();




gsap.to(".loading-counter", {
  delay: 3.5,
  duration: 0.25,
  autoAlpha: 0,
  onComplete() {
    document.querySelector(".loading-counter").style.display = "none";
  },
});

gsap.to(".loading-bar", 0.5, {
  delay: 3.5,
  height: 0,
  stagger: {
    amount: 0.5,
  },
  ease: "power4.inOut",
});

// Show reel scroll trigger
gsap.registerPlugin(ScrollTrigger);

gsap.to(".show-reel-video", {
  width: "calc(60% - var(--margin-default) * 2)",
  scrollTrigger: {
    trigger: ".show-reel-video",
    start: "top 80%",
    end: "top 0%",
    scrub: true,
    markers: false,
  },
  ease: "power2.out",
});


function fadeInOnScroll() {
  setTimeout(() => {
    gsap.utils.toArray(".scroll-fade").forEach((e) => {
      const t = e.closest(".no-scroll-fade");
      if (t && t !== e) return;
      let n = e.closest("section") || document.documentElement,
        o = n.getBoundingClientRect(),
        i = e.getBoundingClientRect(),
        a = i.left - o.left,
        r = Math.min(Math.max(a / o.width, 0), 1);
      const s = 100,
        c = 150,
        l = 200,
        d = 350;
      let u = s + (c - s) * r,
        m = l + (d - l) * r,
        g = `top bottom-=${u}px`,
        p = `top bottom-=${m}px`;
      gsap.fromTo(
        e,
        { opacity: 0.01, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: e,
            scrub: 2,
            invalidateOnRefresh: !0,
            start: g,
            end: p,
          },
        }
      );
    });
  }, 0);
}

function initAnimationsAndScroll() {
  gsap.registerPlugin(ScrollTrigger),
    gsap.registerPlugin(ScrollToPlugin),
    lenis.on("scroll", ScrollTrigger.update),
    gsap.ticker.add((e) => {
      lenis.raf(1e3 * e);
    }),
    // animateHeaderScrub(),
    // animateCanvas(),
    // executeStartAnimations(),
    fadeInOnScroll();
}
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});


