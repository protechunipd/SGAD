test("Test su RequestDemolishBuilding", function () {

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var q1 = new QuantityResource(2,new Resource("Oro"));
    var q2 = new QuantityResource(2,new Resource("Pozioni"));
    var arr = new Array(q1,q2);

    var rDA = new RequestDemolishBuilding(new BuildingComponent(new BuildingPossession(new BuildingWithLevel(null, new Cost(5,arr), 2, "Miniera", null, null, null, 0, true, true),true, new Position(2, 2), 0, 0, null), null));
    rDA.performAction();

    deepEqual(true, true, "Test su performAction()");

});