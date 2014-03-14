test("Test su BuildingWithLevel", function() {

    var buildwithlev1 = [];
    buildwithlev1["StallaL1"] = new BuildingWithLevel(null, null, 1, "Stalla", null, null, null,1, true, true);
    var buildwithlev2 = [];
    buildwithlev2["StallaL2"] = new BuildingWithLevel(null, null, 2, "Stalla", null, null, null,1, true, true);

    var arrunit = [{"cav" : new Unit("cavaliere", 1,2,null), "ban" : new Unit ("bananiere", 1,3, null)}];
    var arruni2 = [{"cav2" : new Unit("cavaliere2", 1,2,null), "ban2" : new Unit ("bananiere2", 1,3, null)}];

    var build = new BuildingWithLevel(new Bonus("bon1", 20.30, 2), new Cost(10, null), 2, "Stalla", buildwithlev1, new ProductedResource(10,5,2, new Resource("Pera")), arrunit, 2, true, true);

    deepEqual(build.getKey(), "StallaL2", "Test su getKey()");
    deepEqual(build.getNextLevelKey(), "StallaL3", "Test su getNextLevelKey()");

    deepEqual(build.getBonus(),new Bonus("bon1", 20.30, 2), "Test su getBonus");
    deepEqual(build.getCost(),new Cost(10, null), "Test su getCost" );
    deepEqual(build.getLevel(), 2, "Test su getLevel");
    deepEqual(build.getNameBuilding(), "Stalla", "Test su getNameBuilding");
    deepEqual(build.getPrecondition()["StallaL1"], new BuildingWithLevel(null, null, 1, "Stalla", null, null, null,1, true, true), "Test su getPreconditions");
    deepEqual(build.getProductedResource(), new ProductedResource(10,5,2, new Resource("Pera")), "Test su getProductedResource");
    deepEqual(build.getProductedUnits(), arrunit, "Test su getProductedUnits (true)");
    notDeepEqual(build.getProductedUnits(), arruni2, "Test su getProductedUnits (false)");
    deepEqual(build.getUnitsSpace(), 2, "Test su getUnitsSpae");
    deepEqual(build.getIsConstructible(), true, "Test su isConstructible");
    deepEqual(build.getIsDestructible(), true, "Test su isDestructible");

    var buildwithlev3 = [{"CasermaL3" : new BuildingWithLevel(null, null, 3, "Caserma", null, null, null, 3, true, true)}];
    build.addPrecondition(buildwithlev3);

    deepEqual(build.getPrecondition()["StallaL1"],new BuildingWithLevel(null, null, 1, "Stalla", null, null, null,1, true, true) , "Test su addPrecondition");


});