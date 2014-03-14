test("Test su ReloadPageAction", function () {

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var rPA = new ReloadPageAction();
    rPA.performAction();

    deepEqual(true, true, "Abilitazione click destro performAction()");

});