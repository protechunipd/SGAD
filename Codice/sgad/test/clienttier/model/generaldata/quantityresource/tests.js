test("Test su QuantityResource", function() {
    var quantity = new QuantityResource (5, new Resource("Pera"));

    deepEqual(quantity.getQuantity(), 5, "Test su getQuantity");
    deepEqual(quantity.getResource(), new Resource("Pera"), "Test su getResource");
    deepEqual(new QuantityResource(3, new Resource("mela")) == quantity, false, "Test su valueOf (true)");
    var uno = new QuantityResource (5, new Resource("Pera"));
    var due = new QuantityResource (5, new Resource("Pera"));
    deepEqual(uno.valueOf() === due.valueOf(), true, "Test su valueOf");
});