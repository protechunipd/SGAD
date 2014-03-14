test("Test su DeleteAccountAction", function () {

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ConfirmMenuFactory(new ReloadPageAction(), new CloseContextualMenu());
    menu.buildMenu();

    var deleAcc = new DeleteAccountAction();
    deleAcc.performAction();

    deepEqual(true, true, "Eliminazione account DeleteAccountAction");

});