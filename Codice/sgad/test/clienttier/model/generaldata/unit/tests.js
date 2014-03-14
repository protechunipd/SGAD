test("Test su Unit", function() {
    var unit = new Unit("cavallo", 20, 30, null);
    deepEqual(unit.getKey(), "cavallo", "Test su getKey()");
    deepEqual(unit.getAttack(), 20, "Test su getAttack()");
    deepEqual(unit.getDefence(), 30, "Test su getDefence()");
});
    