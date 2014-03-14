test("Test su UnitInProgress", function() {

    var uni1 = new UnitInProgress(20, new Unit("Cavaliere", 20,10,null), 10);
    var uni2 = new UnitInProgress(10, new Unit("Bananiere", 10, 20, null), 20);

    deepEqual(uni1.getState(), 10, "Test su getState");
    deepEqual(uni2.getRemainingTime(), 10, "Test su getRemainingTime");

    deepEqual(uni1.getUnit(), new Unit("Cavaliere", 20, 10, null), "Test su getUnit ereditato (true)");
    notDeepEqual(uni1.getUnit(), uni2.getUnit(), "Test su getUnit ereditato (false)");

    deepEqual(uni1, new UnitInProgress(20, new Unit("Cavaliere", 20,10,null), 10), "Test su valueOf (true)");
    notDeepEqual(uni1, uni2, "Test su valueOf (false)");

});