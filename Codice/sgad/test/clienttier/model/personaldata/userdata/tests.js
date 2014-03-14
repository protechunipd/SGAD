test("Test su UserData", function() {

    var bui1 = new BuildingPossession(new BuildingWithLevel(null, null, 2, "Caserma", null, null, null, 2,true, true), true, new Position(2,1), 20, 20, null);
    var bui2 = new BuildingPossession(new BuildingWithLevel(null, null, 2, "Torre", null, null, null, 2,true, true), true, new Position(1,1), 30, 30, null);
    var bui3 = new BuildingPossession(new BuildingWithLevel(null, null, 2, "Stalla", null, null, null, 2,true, true), true, new Position(2,2), 20, 20, null);

    var own1 = {"CasermaL1X2Y1" : bui1, "StallaL2X2Y2" : bui3 };
    var own2 = {"TorreL2X1Y1" : bui2, "StallaL2X2Y2" : bui3 };

    var uni1 = {"cav" : new UnitPossession(2, new Unit("cavaliere",1,2, null)), "ban" : new UnitPossession(3, new Unit("bananiere",2,3,null))};
    var uni2 = {"ban" : new UnitPossession(2, new Unit("bananiere",2,3,null)), "cav" : new UnitPossession(3, new Unit("cavaliere",1,2,null))};

    var res1 = {"Per" : new OwnedResource(2, new Resource("Pera")), "Ban" : new OwnedResource(3, new Resource("Banana"))};
    var res2 = {"Pes" : new OwnedResource(3, new Resource("Pesca")), "Alb" : new OwnedResource(4, new Resource("Albicocca"))};

    var usr1 = new UserData(new AuthenticationData("mail@mail.it", "user"), own1, res1, uni1);
    var usr2 = new UserData(new AuthenticationData("mail@mail2.it", "user2"), own2, res2, uni2);

    deepEqual(usr1.getAuthenticationData(), new AuthenticationData("mail@mail.it", "user"), "Test su getAuthenticationData");

    notDeepEqual(usr1.getOwnedBuildings(), usr2.getOwnedBuildings(), "Test su getOwnedBuildings (false)");
    notDeepEqual(usr1.getOwnedBuildings(), own2, "Test su getOwnedBuildings (false)");
    deepEqual(usr1.getOwnedBuildings(), own1, "Test su getOwnedBuildings (true)");

    notDeepEqual(usr1.getOwnedUnits(), uni2, "Test su getOwnedUnits (false)");
    notDeepEqual(usr1.getOwnedUnits(), usr2.getOwnedUnits(), "Test su getOwnedUnits (false)");
    deepEqual(usr1.getOwnedUnits(), uni1, "Test su getOwnedUnits (true)");

    notDeepEqual(usr1.getOwnedResources(), res2, "Test su getOwnedResources (false)");
    notDeepEqual(usr1.getOwnedResources(), usr2.getOwnedResources(), "Test su getOwnedResources (false)");
    deepEqual(usr1.getOwnedResources(), res1, "Test su getOwnedResources (true)");

    deepEqual(usr1.getOwnedResource("Per").getResource(), new Resource("Pera"), "Test su getOwnedResource (true)");
    notDeepEqual(usr1.getOwnedResource("Per").getResource(), new Resource("Mela"), "Test su getOwnedResource (false)");

    deepEqual(usr1.getUnitPossession("cav").getUnit(), new Unit("cavaliere", 1,2,null), "Test su getUnitPossession (true)");
    notDeepEqual(usr1.getUnitPossession("cav").getUnit(), new Unit("cavaliere", 1,3,null), "Test su getUnitPossession (false)");

    deepEqual(usr1.getBuildingPossession("StallaL2X2Y2"),new BuildingPossession(new BuildingWithLevel(null, null, 2, "Stalla", null, null, null, 2,true, true), true, new Position(2,2), 20, 20, null), "Test su getBuildingPossession" );

    deepEqual(usr1.getTotalUnitSpaces(), 4, "Test su getTotalUnitSpaces");

});