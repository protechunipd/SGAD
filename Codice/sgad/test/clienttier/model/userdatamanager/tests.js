test("Test su UserDataManager", function() {

    var manager = UserDataManager.getInstance();

    var bui1 = new BuildingPossession(new BuildingWithLevel(null, null, 2, "Caserma", null, null, null, 2,true, true), true, new Position(2,1), 20, 20, null);
    var bui3 = new BuildingPossession(new BuildingWithLevel(null, null, 2, "Stalla", null, null, null, 2,true, true), true, new Position(2,2), 20, 20, null);
    var own1 = {"CasermaL1X2Y1" : bui1, "StallaL2X2Y2" : bui3 };
    var uni1 = {"cav" : new UnitPossession(2, new Unit("cavaliere",1,2, null)), "ban" : new UnitPossession(3, new Unit("bananiere",2,3,null))};
    var res1 = {"Per" : new OwnedResource(2, new Resource("Pera")), "Ban" : new OwnedResource(3, new Resource("Banana"))};
    var usr1 = new UserData(new AuthenticationData("mail@mail.it", "user"), own1, res1, uni1);
    manager.setUserData(usr1);

    deepEqual(manager.getUserData().getBuildingPossession("CasermaL1X2Y1"), new BuildingPossession(new BuildingWithLevel(null, null, 2, "Caserma", null, null, null, 2,true, true), true, new Position(2,1), 20, 20, null), "Test su getInstance, get/setUserdata e getBuildingPossession");
    deepEqual(manager.getUserData().getUnitPossession("cav"), new UnitPossession(2, new Unit("cavaliere",1,2, null)), "Test su getUnitPossession");

});