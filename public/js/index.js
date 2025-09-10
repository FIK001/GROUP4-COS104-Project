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
