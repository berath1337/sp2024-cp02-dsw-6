let contentPromo = document.getElementById("contentPromo");
let sidePromo = document.getElementById("sidePromo");
let notif = document.getElementById("notif")
let statsService = {
  showProdOnSaleMain: function (data) {
    data.forEach((product) => {
      if (product.discount > 44) {
        contentPromo.innerHTML += `
          <div id="card" class="card" style="width: 24rem;">
            <div class="card-body">
              <h3 class="card-title">${product.product_name}</h3>
              <img src="${product.product_img}" class="card-img-top" alt="...">
              <p class="card-text">${product.product_description}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"> Price on discount: ${uiService.discount(product.price, product.discount)}$</li>
              <li class="list-group-item"> Original price: ${product.price} $</li>
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
  showProdOnSaleSide: function (data) {
    data.forEach((product) => {
      if (product.discount > 35 && product.discount < 36) {
        sidePromo.insertAdjacentHTML(
          "beforeend",
          `
            <h3 class="card-title">${product.product_name}</h3>
            <div id="card-side" class="card-body">
              <img src="${product.product_img}" class="card-img-top" alt="...">
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"> Price: ${uiService.discount(product.price, product.discount)} $</li>
              <li class="list-group-item">Original price: ${product.price} $</li>
              <li class="list-group-item">Shipping cost: ${product.shipping_cost}</li>
              <li class="list-group-item">Shipping time: ${product.shipping_time}</li>
            </ul>
            <div class="card-body">
              <button id="cartId-${product.product_id}" data-product-id="${product.product_id}" type="button" class="btn btn-dark">Add to cart</button>
            </div>
          `
        );
      }
    });
  }
};

function addProductToCart(productId) {
  console.log(`Adding product ID: ${productId} to cart`); // Debugging log
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
  console.log(`Cart after addition: ${JSON.stringify(cart)}`); // Debugging log
}

document.addEventListener("click", function (e) {
  const target = e.target.closest("button[id^='cartId-']");
  if (target) {
    const productId = parseInt(target.getAttribute('data-product-id'), 10);
    addProductToCart(productId);
    console.log(`Button clicked for product ID: ${productId}`); // Debugging log
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

let uiService = {
  discount: function (originalPrice, discount, fixed = 0) {
    let discountAmount = (discount.toFixed(fixed) / 100) * originalPrice;
    let discountedPrice = originalPrice - discountAmount;
    return discountedPrice.toFixed(fixed);
  },
};

let productApiService = {
  getDataForProducts: async function () {
    try {
      let url = "http://localhost:3000/products";
      let response = await fetch(url);
      let data = await response.json();
      console.log('Product data fetched:', data); // Debugging log
      statsService.showProdOnSaleMain(data);
      statsService.showProdOnSaleSide(data);
    } catch (error) {
      console.log("An error occurred", error);
    }
  }
};

productApiService.getDataForProducts();
