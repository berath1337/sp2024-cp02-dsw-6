let productApiService = {
    getDataForProducts: async function () {
      try {
        let url = "http://localhost:3000/products";
        let response = await fetch(url);
        let data = await response.json();
        console.log('Product data fetched:', data); // Debugging log
        return data;
      } catch (error) {
        console.log("An error occurred", error);
        return [];
      }
    }
  };
  
  function getCartItems() {
    let cart = localStorage.getItem('cart');
    if (!cart) {
      return [];
    }
    return JSON.parse(cart);
  }
  
  function setCartItems(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  async function displayCartItems() {
    const cartItems = getCartItems();
    console.log('Cart items:', cartItems); // Debugging log
    const cartContainer = document.getElementById('cartContainer');
    const products = await productApiService.getDataForProducts();
  
    cartContainer.innerHTML = '';
  
    if (cartItems.length === 0) {
      cartContainer.innerHTML = '<p>No items in cart.</p>';
      updateOrderSummary(0, 0); // Update summary for empty cart
      return;
    }
  
    let subTotal = 0;
    let shippingCharge = 0;
  
    cartItems.forEach(item => {
      const product = products.find(prod => prod.product_id === item.product_id);
      console.log('Product found:', product); // Debugging log
      if (product) {
        const discountedPriceres = ((product.discount.toFixed(0) / 100) * product.price);
        const discountedPrice = product.price - discountedPriceres.toFixed(0)
        subTotal += parseFloat(discountedPrice) * item.quantity;
        shippingCharge += parseFloat(product.shipping_cost) * item.quantity;

        
  
        cartContainer.innerHTML += `
          <div class="cart-item mb-4">
            <div class="d-flex align-items-start border-bottom pb-3">
              <div class="me-4">
                <h5 class="text-truncate font-size-18"><a href="#" class="text-dark">${product.product_name}</a></h5>
                <img src="${product.product_img}" alt="" class="avatar-lg rounded">
              </div>
              <div class="flex-grow-1 align-self-center overflow-hidden">
              <p class="text-muted mb-0">${product.product_description}</p>
              </div>
            </div>
            <div>
              <div class="row">
                <div class="col-md-4">
                  <div class="mt-3">
                    <p class="text-muted mb-2">Price</p>
                    <h5 class="mb-0 mt-2"><span class="text-muted me-2"><del class="font-size-16 fw-normal">$${product.price}</del></span>$${discountedPrice}</h5>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="mt-3 d-flex align-items-center">
                    <p class="text-muted mb-2 me-2">Quantity</p>
                    <div class="d-inline-flex me-3">
                      <select class="form-select form-select-sm w-xl" onchange="updateCartItemQuantity(${item.product_id}, this.value)">
                        ${[...Array(10).keys()].map(i => `<option value="${i+1}" ${item.quantity == i+1 ? 'selected' : ''}>${i+1}</option>`).join('')}
                      </select>
                    </div>
                    <a href="#" class="text-muted px-1" onclick="removeCartItem(${item.product_id})">
                      <i class="mdi mdi-trash-can-outline"></i> Delete
                    </a>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="mt-3">
                    <p class="text-muted mb-2">Total</p>
                    <h5>$${(discountedPrice * item.quantity).toFixed(2)}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        console.log(`Product with ID ${item.product_id} not found in the product list`); // Debugging log
      }
    });
  
    const total = subTotal + shippingCharge;
  
    updateOrderSummary(subTotal, shippingCharge, total);
  }
  
  function updateCartItemQuantity(productId, quantity) {
    let cart = getCartItems();
    const itemIndex = cart.findIndex(item => item.product_id === productId);
    if (itemIndex > -1) {
      cart[itemIndex].quantity = Number(quantity);
      setCartItems(cart);
      displayCartItems();
    }
  }
  
  function removeCartItem(productId) {
    let cart = getCartItems();
    cart = cart.filter(item => item.product_id !== productId);
    setCartItems(cart);
    displayCartItems();
  }
  
  function updateOrderSummary(subTotal, shippingCharge, total) {
    document.getElementById('subTotal').textContent = subTotal.toFixed(2);
    document.getElementById('shippingCharge').textContent = shippingCharge.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
  }
  
  document.addEventListener('DOMContentLoaded', displayCartItems);
  