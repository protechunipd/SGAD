test("Test su TileComponent", function() {

    var tile1 = new TileComponent(new Position(4,3));

    notDeepEqual(tile1.getPosition(), new Position(3,2), "Test su getPosition (false)");
    deepEqual(tile1.getPosition(), new Position(4,3), "Test su getPosition (true)");

    var shape = new Shape();
    shape.addPoint(new Point2D(70, 0));
    shape.addPoint(new Point2D(139, 45));
    shape.addPoint(new Point2D(69, 90));
    shape.addPoint(new Point2D(0, 45));

    deepEqual(tile1.getShape().getPoints(), shape.getPoints(), "Test su getShape");

    deepEqual(tile1.getWorldComponentShape().getShape().getPoints(), shape.getPoints(), "Test su getWorldComponentShape");

});