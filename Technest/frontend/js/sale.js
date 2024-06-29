let contentPromo = document.getElementById("contentPromo");
let sidePromo = document.getElementById("sidePromo");



let statsService={
  showProdOnSaleMain: function(data){
    
   data.forEach(product => {
    if(product.discount > 47.50){
    contentPromo.innerHTML += (`
    <div id="card" class="card" style="width: 24rem;">
 
  <div class="card-body">
    <h3 class="card-title">${product.product_name}</h3>
     <img src="${product.product_img}" class="card-img-top" alt="...">
    <p class="card-text">${product.product_description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"> Price: ${product.price}</li>
    <li class="list-group-item">Shipping cost: ${product.shipping_cost}</li>
    <li class="list-group-item">Shipping time: ${product.shipping_time}</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Go to product</a>
    <a href="#" class="card-link">Add to cart</a>
  </div>
</div>
      `);
  }})
  },
  showProdOnSaleSide: function(data){
    
    data.forEach(product => {
     if(product.discount > 35 && product.discount < 36){
      sidePromo.insertAdjacentHTML('beforeend' , `<div id="card-side" class="card-body"><img src="${product.product_img}" class="card-img-top" alt="..."></div>`);
   }})

}}



let uiService = {
  showProdOnSale: function(){

  }

}






let productApiService = {
  getDataForProducts: async function(){
    try{

      let url = 'http://localhost:3000/products';
      let response = await fetch(url);
      let data = await response.json();
      productData = data;
      console.log(productData);
    
    }
    catch{
      console.log("An error occured");
    }

    statsService.showProdOnSaleMain(productData);
    statsService.showProdOnSaleSide(productData);

  }
}








productApiService.getDataForProducts();

