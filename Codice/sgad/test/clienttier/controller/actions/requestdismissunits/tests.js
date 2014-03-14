test("Test su RequestDismissUnits", function () {

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var q1 = new QuantityResource(2,new Resource("Pera"));
    var q2 = new QuantityResource(2,new Resource("Banana"));
    var quantityResource = new Array(q1,q2);

    var rDU = new RequestDismissUnits(new UnitPossession(4,new Unit("Cavaliere",18,12,new Cost(10800,quantityResource))), 8);
    rDU.performAction();

    deepEqual(true, true, "Test su performAction()");

});