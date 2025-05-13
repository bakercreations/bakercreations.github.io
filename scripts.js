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

// Shopify Buy button
document.addEventListener("DOMContentLoaded", () => {
  // Only execute Shopify Buy Button script if on shop.html
  if (!window.location.pathname.includes("shop.html")) {
    return; // Exit the function, preventing execution on other pages
  }

  // Load Shopify Buy Button Script
  const scriptURL =
    "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

  function loadShopifyScript(callback) {
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        callback();
        return;
      }
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = scriptURL;
    script.onload = callback;
    document.head.appendChild(script);
  }

  function ShopifyBuyInit() {
    const client = ShopifyBuy.buildClient({
      domain: "j7ug9u-vh.myshopify.com",
      storefrontAccessToken: "af7bc0bf5c3cdb9388da2681595f7c74",
    });

    ShopifyBuy.UI.onReady(client).then((ui) => {
      ui.createComponent("product", {
        id: "9766695371056",
        node: document.getElementById("product-component-1741459830828"),
        moneyFormat: "%24%7B%7Bamount%7D%7D",
        options: {
          product: {
            contents: {
              img: false /* Hide product image */,
              title: false /* Hide product title */,
              price: false /* Hide price */,
              description: false /* Hide description */,
              button: true /* Show only the Buy Now button */,
            },
            text: {
              button: "Buy Now",
            },
            styles: {
              product: {
                "text-align": "left" /* Align everything to the left */,
              },
              button: {
                "background-color": "#edcecb",
                color: "#333333",
                padding: "10px 20px",
                margin: "50px",
                border: "none",
                "font-size": "1.5em",
                cursor: "pointer",
                "text-decoration": "none",
                transition: "background-color 0.3s, transform 0.2s",
                ":hover": {
                  "background-color": "#984856",
                  color: "white",
                  transform: "scale(1.05)",
                },
                ":focus": {
                  "background-color": "#984856",
                  color: "white",
                },
              },
            },
          },
          cart: {
            text: {
              total: "Subtotal",
              button: "Checkout",
            },
          },
        },
      });
    });
  }

  // Load the script and initialize Shopify Buy Button
  loadShopifyScript(ShopifyBuyInit);
});

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
    "Limited Time: 20% off with code ROLLWITHIT20",
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
