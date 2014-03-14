test("Test su BuildingPossession", function() {

    var bui1 = new BuildingPossession(new BuildingWithLevel(null, null, 2, "Stalla", null, null, null, 2, true, true), true, new Position(2,1), 20, 20, null);
    var bui2= new BuildingPossession(new BuildingWithLevel(null, null, 3, "Caserma", null, null, null, 2, true, true), false, new Position(2,1), 20, 20, new UnitInProgress(20, new Unit("Tizio", 20, 10, null),20));

    var tes1 = new BuildingWithLevel(null, null, 2, "Stalla", null, null, null, 2, true, true);
    var tes2 = new BuildingWithLevel(null, null, 1, "Stalla", null, null, null, 2, true, true);

    var bui3 = new BuildingPossession(tes1, true, new Position(2,1), 20, 20, null);


    deepEqual(bui1.getBuilding(), tes1, "Test su getBuilding (true)");
    notDeepEqual(bui1.getBuilding(), tes2, "Test su getBuilding (false)");

    deepEqual(bui2.getIsFinished(), false, "Test su getIsFinished");
    deepEqual(bui1.getPosition(), new Position(2,1), "Test su getPosition (true)");
    notDeepEqual(bui1.getPosition(), new Position(2,2), "Test su getPosition (false)");
    deepEqual(bui2.getUnitInProgress(), new UnitInProgress(19, new Unit("Tizio", 20, 10, null),20), "test su getUnitInProgress");
    deepEqual(bui1.getTime(), 20, "Test su getTime (true)");
    notDeepEqual(bui1.getTime(), 30," Test su getTime (false)");

    notDeepEqual(bui1, bui2, "Test su valueOf (false)");
    deepEqual(bui1, bui3, "Test su valueOf (true)");

    deepEqual(bui1.getKey(), "StallaL2X2Y1", "Test su getKey");
});