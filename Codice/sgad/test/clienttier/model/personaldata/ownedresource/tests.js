test("Test su OwnedResource", function() {

    var own1 = new OwnedResource(20, new Resource( "Banana"));
    var own2 = new OwnedResource(20, new Resource( "Pera"));

    deepEqual(own1.getQuantity(), 20, "Test su getQuantity");
    deepEqual(own2.getResource(), new Resource("Pera"), "Test su getResource");

    notDeepEqual(own1, own2, "Test su valueOf(false)");
    deepEqual(own1, new OwnedResource(20, new Resource( "Banana")), "Test su valueOf(True");
    deepEqual(own1.valueOf() === new OwnedResource(20, new Resource( "Banana")).valueOf(), true, "Test su valueOf(True");
});