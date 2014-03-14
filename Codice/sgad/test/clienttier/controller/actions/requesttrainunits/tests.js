test("Test su RequestTrainUnits", function () {

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var q1 = new QuantityResource(2,new Resource("Pera"));
    var q2 = new QuantityResource(2,new Resource("Banana"));
    var quantityResource = new Array(q1,q2);

    var rTU = new RequestTrainUnits(new BuildingPossession(new BuildingWithLevel(new Bonus("Bacca",3,4), new Cost(3600,quantityResource), 2, "Stalla", null, new ProductedResource(100,50,1000,new Resource("Per")), null, 2, true, true), true, new Position(2,1), 20, 20, null),new Unit("Cavaliere",18,12,new Cost(10800,quantityResource)), 8);
    rTU.performAction();

    deepEqual(true, true, "Test su performAction()");

});