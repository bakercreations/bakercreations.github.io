// Add interactivity for hover effects
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("mouseover", () => {
    link.style.transform = "scale(1.1)";
    link.style.transition = "transform 0.2s";
  });

  link.addEventListener("mouseout", () => {
    link.style.transform = "scale(1)";
  });
});

// Example: Dynamic scrolling feature
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.backgroundColor = "#6C3D3D";
  } else {
    header.style.backgroundColor = "#984856";
  }
});
