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

Pizza.prototype.removeTopping = function(topping) {
  var index = this.toppings.indexOf(topping);
  this.toppings.splice(index, 1);
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

$(document).ready(function() {
  var order = new Order();
  var pizza;
  var size;
  var quantity;
  var count = "odd";
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
    toppingDisplay += "</ul>";
    var pizzaIndex = order.pizzas.indexOf(pizza);
    $("#orderDisplay .order-container")
      .append('<span class="remove ' + pizzaIndex +
      '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span><div class="pizza ' + count +
      '"><strong>' + pizza.quantity + ' ' +
      pizza.size.toUpperCase() + ' PIZZA' + plural + '</strong> - $' + pizza.cost() + '<br>' +
      toppingDisplay + '</div>')
    if (count === "odd") {
      count = "even";
    } else {
      count = "odd";
    }
    $(".order-total").empty().append("<strong>Total:</strong> $" + order.cost().toFixed(2));
    $("#pizzaCreation").show();
    $("#pizzaCreation .choose-size h3").text("Add Another Pizza?");
    $(".topping").each(function() {
      $(this).show();
    })
  })

  $("form#placeOrder").submit(function(event) {
    event.preventDefault();
    $(".confirmation").append('<h3>Thank you for placing your order.  Unfortunately this is just a code review so you won\'t get any pizza. The good news is you didn\'t pay any money! If you\'d like to buy a pizza, send $50 to me and I\'ll get you a pizza.</h3><p><a href="?">Place another order</a></p>')
    $("#fullDisplay").fadeOut(1000);
    $(".confirmation").delay(1000).fadeIn(1000);
  })
})
