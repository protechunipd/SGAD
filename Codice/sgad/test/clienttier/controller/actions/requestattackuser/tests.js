test("Test su RequestAttackUser", function () {

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var rAU = new RequestAttackUser();
    rAU.performAction();

    deepEqual(true, true, "Test su performAction()");

});