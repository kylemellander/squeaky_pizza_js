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
  return cost;
}

function Order() {
  this.pizzas = [];
}

Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
}

Order.prototype.cost = function() {
  var cost = 0;
  this.pizzas.forEach(function(pizza) {
    cost += pizza.cost();
  })
  return cost;
}

Order.prototype.removePizza = function(pizza) {
  var index = this.pizzas.indexOf(pizza);
  this.pizzas.splice(index, 1);
}

var addJQueryTopping = function() {
  $(this).click(function() {
    var toppingArray = $(this).html().split(">");
    var topping = toppingArray[toppingArray.length - 1];
    pizza.addTopping(topping);
    $("#displayPizza .toppings").append('<div>' + topping + ' <span class="remove ' + topping.replace(" ", "_") + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span></div>')
    $("#pizzaCost span").text("$" + pizza.cost());
    $(this).unbind("click");
  })
}

$(document).ready(function() {
  var order = new Order();
  var pizza;
  var size;
  var quantity;
  $("#pizzaCreation .size").click(function() {
    size = $(this).attr("class").split(" ")[1];
    pizza = new Pizza(size);
    $("#pizzaCreation").removeClass("col-sm-12");
    $("#pizzaCreation").hide();
    $("#pizzaCreation").addClass("col-sm-9");
    $(".create-pizza").show();
    $("#orderDisplay").show();
    $("#displayPizza .size span").text(pizza.size);
    $("#pizzaCost span").text("$" + pizza.cost().toFixed(2));


  })

  $(".topping").each(function() {
    $(this).click(function() {
      var toppingArray = $(this).html().split(">");
      var topping = toppingArray[toppingArray.length - 1];
      pizza.addTopping(topping);
      $("#displayPizza .toppings").append('<div>' + topping + ' <span class="remove ' + topping.replace(" ", "_") + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span></div>')
      $("#pizzaCost span").text("$" + pizza.cost().toFixed(2));
      $(this).hide();
    })
  })

  $(".create-pizza form").submit(function(event) {
    event.preventDefault();
    quantity = parseInt($(".create-pizza select#quantity").val());
    pizza.quantity = quantity;
    order.addPizza(pizza);
    $(".create-pizza").hide();
    $("#displayPizza .toppings").empty();
    var plural = "";
    if (pizza.quantity > 1) {plural = "S"};
    var toppingDisplay = "<ul class='list-group'>"
    if (pizza.toppings.length === 0) {
      toppingDisplay += "<li class='list-group-item'>No Toppings</li>"
    } else {
      pizza.toppings.forEach(function(t) {
        toppingDisplay += "<li class='list-group-item'>" + t + "</li>"
      })
    }
    toppingDisplay += "</ul>"
    $("#orderDisplay .order-container").append('<div class="pizza"><strong>' + pizza.quantity + ' ' +
                                               pizza.size.toUpperCase() + ' PIZZA' + plural + '</strong><br>' +
                                               toppingDisplay + '$' + pizza.cost() + '</div>')
    $(".order-total").empty().append("<strong>Total:</strong> $" + order.cost().toFixed(2));
    $("#pizzaCreation").show();
    $("#pizzaCreation .choose-size h3").text("Add Another Pizza?");
    $(".topping").each(function() {
      $(this).show();
    })

  })
})
