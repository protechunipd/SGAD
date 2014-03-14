test("Test su ResourceMenuFactory", function() {

    var canvas = document.getElementById("context8");
    var ctx = canvas.getContext("2d");
    canvas.height = 300;
    canvas.width = 300;
    var context = Context.getInstance();
    context.setDrawArea(ctx);

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new ResourceMenuFactory();
    menu.buildMenu();


    deepEqual(true, true, "Disegno menu ResourceMenuFactory");
});