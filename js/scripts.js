function Pizza(size) {
  this.size = size;
  this.toppings = [];
  this.quantity = 1;
}

Pizza.prototype.addTopping = function(topping) {
  this.toppings.push(topping);
}

Pizza.prototype.setQuantity = function(i) {
  this.quantity = i;
}

Pizza.prototype.cost = function() {
  var baseCosts = {"large": 9.99, "medium": 7.99, "family": 12.99};
  var toppingCost = 0.99;
  var toppingCount = this.toppings.length;
  if (toppingCount >= 1) { toppingCount -= 1; };
  var cost = (baseCosts[this.size] + (toppingCost * toppingCount)) * this.quantity;
  return cost.toFixed(2);
}

function Order() {
  this.pizzas = [];
}

Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
}

Order.prototype.cost = function() {
  var cost = 0.00;
  this.pizzas.forEach(function(pizza) {
    cost += pizza.cost();
  })
  return cost;
}

Order.prototype.removePizza = function(pizza) {
  var index = this.pizzas.indexOf(pizza);
  this.pizzas.splice(index, 1);
}

$(document).ready(function() {
  var order = new Order();
  $("#pizzaCreation .size").click(function() {
    var size = $(this).attr("class").split(" ")[1];
    var pizza = new Pizza(size);
    $("#pizzaCreation").removeClass("col-sm-12");
    $("#pizzaCreation").addClass("col-sm-10");
    $("#pizzaCreation .choose-size").hide();
    $(".create-pizza").show();
    $("#orderDisplay").show();
    $("#displayPizza .size span").text(pizza.size);
    $("#pizzaCost span").text("$" + pizza.cost());

    $(".topping").each(function() {
      $(this).click(function() {
        var toppingArray = $(this).html().split(">");
        var topping = toppingArray[toppingArray.length - 1];
        pizza.addTopping(topping);
        $("#displayPizza .toppings").append('<div>' + topping + ' <span class="remove ' + topping.replace(" ", "_") + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span></div>')
        $("#pizzaCost span").text("$" + pizza.cost());
        $(this).unbind("click");
      })
    })
  })
})
