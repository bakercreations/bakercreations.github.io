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

// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});

// Shop
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".main-image img");
  const thumbnails = document.querySelectorAll(".thumbnail-images img");
  const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
  const fullscreenImage = fullscreenOverlay.querySelector("img");
  const closeButton = fullscreenOverlay.querySelector(".close-button");
  const modalLeftArrow = fullscreenOverlay.querySelector(".arrow.left");
  const modalRightArrow = fullscreenOverlay.querySelector(".arrow.right");

  let currentImageIndex = 0;

  // Update fullscreen image
  const updateFullscreenImage = (index) => {
    fullscreenImage.src = thumbnails[index].src;
  };

  // Show fullscreen modal
  mainImage.addEventListener("click", () => {
    fullscreenOverlay.style.display = "flex";
    updateFullscreenImage(currentImageIndex);
  });

  // Close fullscreen modal
  closeButton.addEventListener("click", () => {
    fullscreenOverlay.style.display = "none";
  });

  fullscreenOverlay.addEventListener("click", (e) => {
    if (e.target === fullscreenOverlay) {
      fullscreenOverlay.style.display = "none";
    }
  });

  // Navigate fullscreen images
  modalLeftArrow.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
    updateFullscreenImage(currentImageIndex);
  });

  modalRightArrow.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
    updateFullscreenImage(currentImageIndex);
  });

  // Update main image and active thumbnail
  const updateMainImage = (index) => {
    currentImageIndex = index;
    mainImage.src = thumbnails[index].src;
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === index);
    });
  };

  // Navigate thumbnails from main gallery
  const galleryLeftArrow = document.querySelector(".main-image .arrow.left");
  const galleryRightArrow = document.querySelector(".main-image .arrow.right");

  galleryLeftArrow.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
    updateMainImage(currentImageIndex);
  });

  galleryRightArrow.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
    updateMainImage(currentImageIndex);
  });

  // Click on thumbnails to update main image
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      updateMainImage(index);
    });
  });

  // Toggle expandable sections
  expandableSections.forEach((section) => {
    section.addEventListener("click", () => {
      const content = section.nextElementSibling;
      const isOpen = content.style.display === "block";
      content.style.display = isOpen ? "none" : "block";
    });
  });
});

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.classList.toggle("active");
}

// Contact Form
document.addEventListener("DOMContentLoaded", () => {
  var form = document.getElementById("my-form");

  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML =
            "Thanks for your submission! We will get back to you shortly.";
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML =
                "Oops! There was a problem submitting your form.";
            }
          });
        }
      })
      .catch((error) => {
        status.innerHTML = "Oops! There was a problem submitting your form.";
      });
  }

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});

// Dynamic banner
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("banner-message");
  const messages = [
    "Free shipping on orders over $75",
    "New Release: Use ROLLWITHIT20 for 20% off",
  ];
  let index = 0;

  setInterval(() => {
    banner.classList.add("fade-out");

    setTimeout(() => {
      index = (index + 1) % messages.length;
      banner.textContent = messages[index];
      banner.classList.remove("fade-out");
    }, 500);
  }, 5000); // switch every 5 seconds
});

// Video
