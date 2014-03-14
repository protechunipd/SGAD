test("Test su Position", function() {
    var pos1 = new Position(20,30);
    var pos2 = new Position(30,20);
    var pos3 = new Position (30, 20);

    deepEqual(pos1.getX(), 20, "Test su getX");
    deepEqual(pos2.getY(), 20, "Test su getY");
    notDeepEqual(pos1.valueOf(), pos3.valueOf(), "Test su valueOf (false)");
    notDeepEqual(pos1, pos3, "Test su valueOf (false)");
    deepEqual(pos2.valueOf(), pos3.valueOf(), "Test su valueOf (true)");
    deepEqual(pos2, pos3, "Test su valueOf (true)");

});