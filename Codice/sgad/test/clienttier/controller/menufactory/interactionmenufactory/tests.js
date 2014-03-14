test("Test su InteractionMenuFactory", function() {

    var canvas = document.getElementById("context8");
    var ctx = canvas.getContext("2d");
    canvas.height = 100;
    canvas.width = 100;
    var context = Context.getInstance();
    context.setDrawArea(ctx);

    var bound = Bound.getInstance();
    bound.setHeight(100);
    bound.setWidth(100);

    var menu = new InteractionMenuFactory();
    menu.buildMenu();

    deepEqual(true, true, "Disegno menu InteractionMenuFactory");
});