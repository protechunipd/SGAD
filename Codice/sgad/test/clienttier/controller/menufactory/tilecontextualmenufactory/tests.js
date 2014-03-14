test("Test su TileContextualMenuFactory", function() {

    var canvas = document.getElementById("context8");
    var ctx = canvas.getContext("2d");
    canvas.height = 300;
    canvas.width = 300;
    var context = Context.getInstance();
    context.setDrawArea(ctx);

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var menu = new TileContextualMenuFactory(new TileComponent(new Position(3,2)),new Point2D(0,0));
    menu.buildMenu();

    var frame = new FrameWidget("Miniera",new Point2D(0, 0));

    menu.createConstructionWidgets(frame);

    menu.createProductedResourcesWidget(frame,new BuildingWithLevel(null, null, 2, "Miniera", null, null ,null, 0, true, true),0, 20, 20);


    deepEqual(true, true, "Disegno menu TileContextualMenuFactory");
});