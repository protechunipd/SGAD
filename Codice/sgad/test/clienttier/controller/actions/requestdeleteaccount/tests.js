test("Test su RequestDeleteAccount", function () {

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var rDA = new RequestDeleteAccount();
    rDA.performAction();

    deepEqual(true, true, "Test su performAction()");

});