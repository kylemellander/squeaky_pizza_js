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
})

describe("Order", function() {
  it("creates an empty order", function() {
    var testOrder = new Order();
    expect(testOrder.pizzas).to.eql([]);
  })
})
