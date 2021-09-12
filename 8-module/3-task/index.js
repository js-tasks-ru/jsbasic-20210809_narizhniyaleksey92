export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {

    if(typeof product === 'undefined' || product === null ) {
      return;
      }

    let findMessage = false;
    for(let item of this.cartItems){

      if(item.product.id == product.id){
      item.count += 1;
      findMessage = true;
      break;
      }

    }

    if(findMessage == false) this.cartItems.push({product:product, count:1});

    let cartItem = this.cartItems.slice();
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {

    for(let i = 0; i < this.cartItems.length; i++){

      if(this.cartItems[i].product.id == productId){
        this.cartItems[i].count += amount;
          if(this.cartItems[i].count == 0 ) this.cartItems.splice(i, 1);
        break;
      }

    }

   this.onProductUpdate( this.cartItems);
  }

  isEmpty() {
   return this.cartItems.length <= 0 ? true : false;
  }

  getTotalCount() {
   let counter = 0;
   Array.from(this.cartItems).forEach(val => counter += val.count)
   return counter;
  }

  getTotalPrice() {
    let totalPrice = Array.from(this.cartItems).reduce(function(previousValue, currentValue, index, array) {
       return previousValue + (currentValue.product.price * currentValue.count);
      }, 0);
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}
