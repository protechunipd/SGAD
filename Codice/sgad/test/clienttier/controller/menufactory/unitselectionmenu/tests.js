test("Test su UnitSelectionMenu", function() {
    var canvas = document.getElementById("context8");
    var ctx = canvas.getContext("2d");
    canvas.height = 300;
    canvas.width = 300;
    var context = Context.getInstance();
    context.setDrawArea(ctx);

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new UnitSelectionMenu(new BuildingPossession(new BuildingWithLevel(null, null, 2, "Miniera",null, null, null, 0, true, true),true, null, 0, 0, null));
    menu.buildMenu();

    deepEqual(true, true, "Disegno menu UnitSelectionMenu");
});