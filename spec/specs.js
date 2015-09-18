describe("Pizza", function() {
  it("creates a pizza with a size", function() {
    var testPizza = new Pizza("large");
    expect(testPizza.size).to.equal("large");
  })
})
