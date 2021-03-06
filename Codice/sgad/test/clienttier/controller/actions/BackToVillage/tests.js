test("Test su BackToVillage", function () {

    var bui1 = new BuildingPossession(new BuildingWithLevel(null, null, 2, "Caserma", null, null, null, 2,true, true), true, new Position(2,1), 20, 20, null);
    var bui3 = new BuildingPossession(new BuildingWithLevel(null, null, 2, "Stalla", null, null, null, 2,true, true), true, new Position(2,2), 20, 20, null);
    var own1 = {"CasermaL1X2Y1" : bui1, "StallaL2X2Y2" : bui3 };
    var uni1 = {"cav" : new UnitPossession(2, new Unit("cavaliere",1,2, null)), "ban" : new UnitPossession(3, new Unit("bananiere",2,3,null))};
    var res1 = {"Per" : new OwnedResource(2, new Resource("Pera")), "Ban" : new OwnedResource(3, new Resource("Banana"))};
    var usr1 = new UserData(new AuthenticationData("mail@mail.it", "user"), own1, res1, uni1);

    var manager = UserDataManager.getInstance();
    manager.setUserData(usr1);

    var bck = BackupManager.getInstance();
    bck.saveDatas();
    deepEqual(UserDataManager.getInstance().getUserData().getOwnedResource("Per").getQuantity(), 2, "Test su getQuantity() di UserData");

    var data = {
        quantity : 5,
        result : true
    };
    var q1 = new QuantityResource(2,new Resource("Pera"));
    var q2 = new QuantityResource(2,new Resource("Banana"));
    var quantityResource = new Array(q1,q2);
    var building = new BuildingPossession(new BuildingWithLevel(new Bonus("Bacca",3,4), new Cost(3600,quantityResource), 2, "Stalla", null, new ProductedResource(100,50,1000,new Resource("Per")), null, 2, true, true), true, new Position(2,1), 20, 20, null);
    var actionHR = new HarvestResources(building);
    actionHR.setActionDatas(data);
    actionHR.performAction();

    deepEqual(UserDataManager.getInstance().getUserData().getOwnedResource("Per").getQuantity(), 7, "Test su getQuantity() di UserData");

    var actionBTV = new BackToVillage();
    actionBTV.performAction();

    notDeepEqual(UserDataManager.getInstance().getUserData().getOwnedResource("Per").getQuantity(), 2, "Test su getQuantity() di UserData");

});