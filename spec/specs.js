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
    testPizza.setQuantity(1);
    expect(testPizza.quantity).to.equal(1);
  })

  it("calculates the cost of a pizza", function() {
    var testPizza = new Pizza("large");
    testPizza.setQuantity(1);
    expect(testPizza.cost()).to.equal(9.99);
  })
})

describe("Order", function() {
  it("creates an empty order", function() {
    var testOrder = new Order();
    expect(testOrder.pizzas).to.eql([]);
  })
})
