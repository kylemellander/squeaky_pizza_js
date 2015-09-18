describe("Pizza", function() {
  it("creates a pizza with a size", function() {
    var testPizza = new Pizza("large");
    expect(testPizza.size).to.equal("large");
  })

  it("adds a topping to a pizza", function() {
    var testPizza = new Pizza("large");
    testPizza.addTopping("Pepperoni");
    expect(testPizza.toppings).to.eql(["Pepperoni"]);
  })

  it("adds a quantity to a pizza", function() {
    var testPizza = new Pizza("large");
    testPizza.setQuantity(5);
    expect(testPizza.quantity).to.equal(5);
  })

  it("calculates the cost of a pizza", function() {
    var testPizza = new Pizza("large");
    testPizza.setQuantity(2);
    expect(testPizza.cost()).to.equal(19.98);
  })

  it("calculates the cost of a 3-topping pizza", function() {
    var testPizza = new Pizza("large");
    testPizza.addTopping("Pepperoni");
    testPizza.addTopping("Anchovies");
    testPizza.addTopping("Onions");
    expect(testPizza.cost()).to.equal(11.97);
  })

  it("removes a topping from a pizza", function() {
    var testPizza = new Pizza("ginormous");
    testPizza.addTopping("Pepperoni");
    testPizza.addTopping("Anchovies");
    testPizza.addTopping("Onions");
    testPizza.removeTopping("Anchovies");
    expect(testPizza.toppings).to.eql(["Pepperoni", "Onions"])
  })
})

describe("Order", function() {
  it("creates an empty order", function() {
    var testOrder = new Order();
    expect(testOrder.pizzas).to.eql([]);
  })

  it("adds a pizza to an order", function() {
    var testPizza = new Pizza("large");
    testPizza.setQuantity(1);
    var testOrder = new Order();
    testOrder.addPizza(testPizza);
    expect(testOrder.pizzas).to.eql([testPizza])
  })

  it("calculates the cost of an order", function() {
    var testPizza = new Pizza("large");
    testPizza.setQuantity(1);
    var testOrder = new Order();
    testOrder.addPizza(testPizza);
    expect(testOrder.cost()).to.equal(9.99);
  })

  it("removes a pizza from an order", function() {
    var testPizza = new Pizza("large");
    testPizza.setQuantity(1);
    var testOrder = new Order();
    testOrder.addPizza(testPizza);
    testOrder.removePizza(testPizza);
    expect(testOrder.pizzas).to.eql([]);
  })
})
