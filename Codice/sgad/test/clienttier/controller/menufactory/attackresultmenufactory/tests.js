test("Test su AttackResultMenuFactory", function() {

    var canvas = document.getElementById("context8");
    var ctx = canvas.getContext("2d");
    canvas.height = 300;
    canvas.width = 300;
    var context = Context.getInstance();
    context.setDrawArea(ctx);

    var userData = UserDataManager.getInstance().getUserData();

    var menu = new AttackResultMenuFactory(true, userData, userData, null);
    menu.buildMenu();

    menu = new AttackResultMenuFactory(false, userData, userData, null);
    menu.buildMenu();

    deepEqual(true, true, "Disegno menu AttackResultMenuFactory ");
});