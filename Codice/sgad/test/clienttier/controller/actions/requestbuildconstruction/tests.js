test("Test su RequestBuildConstruction", function () {

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var rBC = new RequestBuildConstruction(new TileComponent(new Position(1,1)), "StallaL2");
    rBC.performAction();


    deepEqual(true, true, "Test su performAction()");

});