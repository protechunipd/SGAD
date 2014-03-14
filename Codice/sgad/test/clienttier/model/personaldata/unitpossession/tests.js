test("Test su UnitPossession", function() {
    var uni1 = new UnitPossession(20, new Unit("cavaliere", 10, 20, null));
    var uni2 = new UnitPossession(10, new Unit("bananiere", 20, 10, null));

    deepEqual(uni1.getQuantity(), 20, "Test su getQuantity");
    deepEqual(uni2.getUnit(), new Unit("bananiere", 20, 10, null), "Test su getUnit");

    notDeepEqual(uni1, uni2, "Test su valueOf (false)");
    deepEqual(uni1, new UnitPossession(20, new Unit("cavaliere", 10, 20, null)), "Test su valueOf (true)");

});