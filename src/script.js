'use strict';

const logo = document.querySelector('.logo');
const cartIcon = document.querySelectorAll('.cart-icon');
const cartPreview = document.querySelectorAll('.cart-preview');
const btnCheckoutPreview = document.querySelectorAll('.btn-checkout-preview');
const btnSubscribe = document.querySelectorAll('.btn-subscribe');
const subscriptionSuccessMessage = document.querySelectorAll(
  '.subscription-success-message'
);
const closeModal = document.querySelectorAll('.fa-xmark');
const btnAddWishlist = document.querySelectorAll('.btn-wishlist');
const btnAddCart = document.querySelectorAll('.btn-cart');
const cartPreviewContainer = document.querySelector('.cart-preview-list');
const previewTextCart = document.querySelector('.preview-text-cart');
const cart = document.querySelector('.cart-list');
const wishlist = document.querySelector('.wishlist-list');
const navIcon = document.querySelectorAll('.nav-icon');
const navbar = document.querySelectorAll('.navbar');
const closeNav = document.querySelectorAll('.close');

////////////////////////////////////////////////////////

const cartVisible = function () {
  cartPreview.forEach(el => {
    el.style.display = 'block';
  });
  btnCheckoutPreview.forEach(el => {
    el.style.display = 'block';
  });
};

const cartHidden = function () {
  cartPreview.forEach(el => {
    el.style.display = 'none';
  });
  btnCheckoutPreview.forEach(el => {
    el.style.display = 'none';
  });
};

const init = function () {
  logo.addEventListener('click', function () {
    location.href = 'index.html';
  });

  cartIcon.forEach(button => {
    button.addEventListener('mouseover', cartVisible);
  });

  cartPreview.forEach(button => {
    button.addEventListener('mouseover', cartVisible);
  });

  btnCheckoutPreview.forEach(button => {
    button.addEventListener('mouseover', cartVisible);
  });

  cartPreview.forEach(button => {
    button.addEventListener('mouseout', cartHidden);
  });

  btnCheckoutPreview.forEach(button => {
    button.addEventListener('click', function () {
      location.href = '../cart.html';
    });
  });
};
init();

// Subscription Success Message
const subscriptionMessage = function () {
  subscriptionSuccessMessage.forEach(el => {
    el.style.display = 'block';
  });
  subscriptionSuccessMessage.forEach(el => {
    el.style.display = 'flex';
  });

  closeModal.forEach(button => {
    button.addEventListener('click', function () {
      subscriptionSuccessMessage.forEach(el => {
        el.style.display = 'none';
      });
    });
  });
};

btnSubscribe.forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    subscriptionMessage();
  });
});

// Delete Items
const deleteItem = function () {
  const btnDelete = document.querySelectorAll('.btn-delete');
  btnDelete.forEach(button => {
    button.addEventListener('click', function () {
      this.parentElement.remove();
    });
  });
};

// Clear Preview Text
const clearPreviewText = function () {
  previewTextCart.style.display = 'none';
};

// Add to Wishlist
btnAddWishlist.forEach(button => {
  button.addEventListener('click', function () {
    button.classList.toggle('saved');

    const wishlistMarkup = `
    <li class="wish-list-item">
      <img src="${this.parentElement.children[0].src}" alt="" />
      <div class="description">
        <h4 class="product-name">${this.parentElement.children[1].textContent}</h4>
        <p>${this.parentElement.children[2].textContent}</p>
      </div>
      <button class="btn btn-delete btn-delete-wish">
       <i class="fa-solid fa-trash-can"></i>
      </button>
    </li>
    `;

    // Save Wishlist to Local Storage
    localStorage.setItem('wish-item', wishlistMarkup);
    storeWishlistItem();
  });
});

// Add to Cart Preview
btnAddCart.forEach(button => {
  button.addEventListener('click', function () {
    const markup = `
    <li class="index-preview-list-item">
      <img src="${this.parentElement.children[0].src}" alt="" />
      <div class="description">
        <h4 class="product-name">${this.parentElement.children[1].textContent}</h4>
        <p>${this.parentElement.children[2].textContent}</p>
      </div>
      <button class="btn btn-delete btn-delete-preview">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </li>
    `;

    const cartMarkup = `
    <li class="cart-list-item">
      <img src="${this.parentElement.children[0].src}" alt="" />
      <div class="description">
        <h4 class="product-name">${this.parentElement.children[1].textContent}</h4>
        <p>${this.parentElement.children[2].textContent}</p>
      </div>
      <button class="btn btn-delete btn-delete-cart">
       <i class="fa-solid fa-trash-can"></i>
      </button>
    </li>
    `;

    clearPreviewText();

    // Save Cart Preview Item to Local Storage
    localStorage.setItem('item', markup);
    storePreviewItem();

    // Save Cart to Local Storage
    localStorage.setItem('cart-item', cartMarkup);
    storeCartItem();

    deleteItem();
  });
});

// Local Storage
const storePreviewItem = function () {
  let previewStorage = localStorage.getItem('item');
  if (previewStorage) {
    clearPreviewText();
  }

  cartPreviewContainer.insertAdjacentHTML('beforeend', previewStorage);

  if (previewStorage === null) {
    cartPreviewContainer.innerHTML = '';
  }

  const btnDeletePreview = document.querySelector('.btn-delete-preview');
  if (btnDeletePreview) {
    btnDeletePreview.addEventListener('click', function () {
      localStorage.removeItem('item');
      localStorage.removeItem('cart-item');
      this.parentElement.remove();
    });
  }
};
storePreviewItem();

const storeCartItem = function () {
  let cartStorage = localStorage.getItem('cart-item');

  if (cart) {
    cart.insertAdjacentHTML('beforeend', cartStorage);

    if (cartStorage === null) {
      cart.innerHTML = '';
    }
  }

  const btnDeleteCart = document.querySelector('.btn-delete-cart');
  if (btnDeleteCart) {
    btnDeleteCart.addEventListener('click', function () {
      localStorage.removeItem('cart-item');
      localStorage.removeItem('item');
      this.parentElement.remove();
    });
  }
};
storeCartItem();

const storeWishlistItem = function () {
  let wishStorage = localStorage.getItem('wish-item');

  if (wishlist) {
    wishlist.insertAdjacentHTML('beforeend', wishStorage);

    if (wishStorage === null) {
      wishlist.innerHTML = '';
    }
  }

  const btnDeleteWish = document.querySelector('.btn-delete-wish');
  if (btnDeleteWish) {
    btnDeleteWish.addEventListener('click', function () {
      localStorage.removeItem('wish-item');
      this.parentElement.remove();
    });
  }
};
storeWishlistItem();

// Filtering Products
const checkbox = document.querySelectorAll('input[type="checkbox"]');
const homeProducts = document.querySelectorAll('.product-home');
const gardenProducts = document.querySelectorAll('.product-garden');
const kitchenProducts = document.querySelectorAll('.product-kitchen');
const decorProducts = document.querySelectorAll('.product-decor');

checkbox.forEach(checkbox => {
  checkbox.addEventListener('click', function (e) {
    e.preventDefault();

    const { filter } = e.target.dataset;

    homeProducts.forEach(product => {
      if (filter === 'all-home') {
        product.style.display = 'block';
      } else {
        if (product.classList.contains(filter)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      }
    });

    gardenProducts.forEach(product => {
      if (filter === 'all-garden') {
        product.style.display = 'block';
      } else {
        if (product.classList.contains(filter)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      }
    });

    kitchenProducts.forEach(product => {
      if (filter === 'all-kitchen') {
        product.style.display = 'block';
      } else {
        if (product.classList.contains(filter)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      }
    });

    decorProducts.forEach(product => {
      if (filter === 'all-decor') {
        product.style.display = 'block';
      } else {
        if (product.classList.contains(filter)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      }
    });
  });
});

// Mobile Version
navIcon.forEach(icon => {
  icon.addEventListener('click', function () {
    navbar.forEach(nav => {
      nav.style.display = 'block';
    });
  });
});

closeNav.forEach(icon => {
  icon.addEventListener('click', function () {
    navbar.forEach(nav => {
      nav.style.display = 'none';
    });
  });
});
