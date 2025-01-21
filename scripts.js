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
  const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
  const fullscreenImage = fullscreenOverlay.querySelector("img");
  const closeButton = fullscreenOverlay.querySelector(".close-button");
  const modal = document.createElement("div");

  let currentImageIndex = 0;

  // Setup modal structure
  modal.classList.add("image-modal");

  const modalImage = modal.querySelector("img");
  const closeModal = modal.querySelector(".close-modal");

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

  const updateFullscreenImage = (index) => {
    fullscreenImage.src = thumbnails[index].src;
  };

  mainImage.addEventListener("click", () => {
    fullscreenOverlay.style.display = "flex";
    updateFullscreenImage(currentImageIndex);
  });

  closeButton.addEventListener("click", () => {
    fullscreenOverlay.style.display = "none";
  });

  fullscreenOverlay.addEventListener("click", (e) => {
    if (e.target === fullscreenOverlay) {
      fullscreenOverlay.style.display = "none";
    }
  });

  // Functions to open and close the modal
  const openModal = () => {
    modal.classList.add("open");
    modalImage.src = thumbnails[currentImageIndex].src;
  };

  const closeModalHandler = () => {
    modal.classList.remove("open");
  };

  // Navigate images
  const navigateImage = (direction) => {
    currentImageIndex =
      (currentImageIndex + direction + thumbnails.length) % thumbnails.length;
    modalImage.src = thumbnails[currentImageIndex].src;
  };

  // Event listeners
  mainImage.addEventListener("click", openModal);
  closeModal.addEventListener("click", closeModalHandler);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModalHandler();
  });
  leftArrow.addEventListener("click", () => navigateImage(-1));
  rightArrow.addEventListener("click", () => navigateImage(1));

  // Sync thumbnails and main image
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      currentImageIndex = index;
      mainImage.src = thumbnail.src;
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      thumbnail.classList.add("active");
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

document.addEventListener("DOMContentLoaded", () => {
  // Mock Data for Cart Items
  const cartItems = [
    {
      id: 1,
      name: "Roller Cane",
      price: 49.99,
      quantity: 1,
      thumbnail: "images/shop_product_1.png",
    },
  ];

  const cartItemsContainer = document.querySelector(".cart-items");
  const totalCostElement = document.getElementById("total-cost");

  // Function to calculate total cost
  const calculateTotalCost = () => {
    const total = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    totalCostElement.textContent = `$${total.toFixed(2)}`;
  };

  // Function to render cart items
  const renderCartItems = () => {
    cartItemsContainer.innerHTML = "";
    cartItems.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.name}">
        <span>${item.name}</span>
        <div class="quantity-control">
          <button data-action="decrease" data-id="${item.id}">-</button>
          <input type="number" value="${item.quantity}" readonly>
          <button data-action="increase" data-id="${item.id}">+</button>
        </div>
        <span>$${item.price.toFixed(2)}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    calculateTotalCost();
  };

  // Function to update quantity
  const updateQuantity = (id, action) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      if (action === "increase") {
        item.quantity++;
      } else if (action === "decrease" && item.quantity > 1) {
        item.quantity--;
      }
    }
    renderCartItems();
  };

  // Event Listener for Quantity Buttons
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.dataset.id, 10);
      const action = e.target.dataset.action;
      updateQuantity(id, action);
    }
  });

  // Initial Render
  renderCartItems();
});
