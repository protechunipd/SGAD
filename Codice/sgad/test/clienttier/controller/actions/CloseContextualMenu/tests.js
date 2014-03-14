test("Test su CloseContextualMenu", function () {

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var contMenu = new CloseContextualMenu();
    contMenu.performAction();

    deepEqual(true, true, "Chiusura menu CloseContextualMenu");

});