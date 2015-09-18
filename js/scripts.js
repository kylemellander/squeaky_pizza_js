function Pizza(size) {
  this.size = size;
  this.toppings = [];
}

Pizza.prototype.addTopping = function(topping) {
  this.toppings.push(topping);
}

Pizza.prototype.setQuantity = function(i) {
  this.quantity = i;
}

function Order() {
  this.pizzas = [];
}
