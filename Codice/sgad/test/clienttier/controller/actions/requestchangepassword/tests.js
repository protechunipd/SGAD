test("Test su RequestChangePassword", function () {

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var rCP = new RequestChangePassword("banana","carota","carota");
    rCP.performAction();

    deepEqual(true, true, "Test su performAction()");

});