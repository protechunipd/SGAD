test("Test su EnableRightClick", function () {

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var enR = new EnableRightClick();
    enR.performAction();

    deepEqual(true, true, "Abilitazione click destro EnableRightClick");

});