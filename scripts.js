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

// Shop
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".main-image img");
  const thumbnails = document.querySelectorAll(".thumbnail-images img");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");
  const expandableSections = document.querySelectorAll(".expandable h3");
  const quantityInput = document.querySelector(".quantity input");
  const quantityButtons = document.querySelectorAll(".quantity button");

  let currentImageIndex = 0;

  // Update main image and active thumbnail
  function updateMainImage(index) {
    currentImageIndex = index;
    mainImage.src = thumbnails[index].src;
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === index);
    });
  }

  // Left and right arrow functionality
  leftArrow.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
    updateMainImage(currentImageIndex);
  });

  rightArrow.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
    updateMainImage(currentImageIndex);
  });

  // Click on thumbnails
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      updateMainImage(index);
    });
  });

  // Enlarge main image on click
  mainImage.addEventListener("click", () => {
    mainImage.classList.toggle("enlarge");
  });

  // Toggle expandable sections
  expandableSections.forEach((section) => {
    section.addEventListener("click", () => {
      const content = section.nextElementSibling;
      const isOpen = content.style.display === "block";
      content.style.display = isOpen ? "none" : "block";
    });
  });

  // Quantity adjustment
  document.querySelector(".quantity").addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const action = event.target.dataset.action;
      let currentValue = parseInt(quantityInput.value, 10) || 0;
      if (action === "increase") currentValue += 1;
      if (action === "decrease" && currentValue > 1) currentValue -= 1;
      quantityInput.value = currentValue;
    }
  });
});

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.classList.toggle("active");
}
