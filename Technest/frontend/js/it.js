document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  const mobileSearchBtn = document.getElementById("mobileSearchBtn");
  const contentPromo = document.getElementById("contentPromo");

  const statsService = {
      showProdOnSaleMain: function(data) {
          contentPromo.innerHTML = ""; // Clear previous content
          data.forEach((product) => {
              if (product.product_category === "wg") {
                  contentPromo.innerHTML += `
                      <div class="card" style="width: 100%; max-width: 24rem;">
                          <div class="card-body">
                              <h3 class="card-title">${product.product_name}</h3>
                              <img src="${product.product_img}" class="card-img-top" alt="...">
                              <p class="card-text">${product.product_description}</p>
                          </div>
                          <ul class="list-group list-group-flush">
                              <li class="list-group-item">Price on discount: ${uiService.discount(product.price, product.discount)}$</li>
                              <li class="list-group-item">Original price: ${product.price} $</li>
                              <li class="list-group-item">Shipping cost: ${product.shipping_cost}</li>
                              <li class="list-group-item">Shipping time: ${product.shipping_time}</li>
                          </ul>
                          <div class="card-body">
                              <button id="cartId-${product.product_id}" data-product-id="${product.product_id}" type="button" class="btn btn-dark">Add to cart</button>
                          </div>
                      </div>
                  `;
              }
          });
      },
  };

  function addProductToCart(productId) {
      let cart = localStorage.getItem('cart');
      if (!cart) {
          cart = [];
      } else {
          cart = JSON.parse(cart);
      }

      const productIndex = cart.findIndex(item => item.product_id === productId);
      if (productIndex !== -1) {
          cart[productIndex].quantity += 1;
      } else {
          cart.push({ product_id: productId, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
  }

  document.addEventListener("click", function(e) {
      const target = e.target.closest("button[id^='cartId-']");
      if (target) {
          const productId = parseInt(target.getAttribute('data-product-id'), 10);
          addProductToCart(productId);
          const toastId = `toast-${productId}`;
          const toastHtml = `
              <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000">
                  <div class="toast-header">
                      <img src="..." class="rounded me-2" alt="...">
                      <strong class="me-auto">Technest</strong>
                      <small class="text-muted">Just now</small>
                      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
                  <div class="toast-body">
                      Product added to cart.
                  </div>
              </div>
          `;
          notif.insertAdjacentHTML('beforeend', toastHtml);
          const toastElement = document.getElementById(toastId);
          const toast = new bootstrap.Toast(toastElement);
          toast.show();
      }
  });

  const uiService = {
      discount: function(originalPrice, discount, fixed = 0) {
          let discountAmount = (discount.toFixed(fixed) / 100) * originalPrice;
          let discountedPrice = originalPrice - discountAmount;
          return discountedPrice.toFixed(fixed);
      },
  };

  const productApiService = {
      getDataForProducts: async function(searchTerm = "") {
          try {
              let url = "http://localhost:3000/products";
              let response = await fetch(url);
              let data = await response.json();
              if (searchTerm) {
                  data = data.filter(product =>
                      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
                  );
              }
              statsService.showProdOnSaleMain(data);
          } catch (error) {
              console.log("An error occurred", error);
          }
      }
  };

  searchBtn.addEventListener("click", function() {
      const searchTerm = searchInput.value;
      productApiService.getDataForProducts(searchTerm);
  });

  mobileSearchBtn.addEventListener("click", function() {
      const searchTerm = mobileSearchInput.value;
      productApiService.getDataForProducts(searchTerm);
  });

  productApiService.getDataForProducts();
});
