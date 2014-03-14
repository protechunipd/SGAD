test("Test sulle collection e sugli iterator", function() {

    var collezione = new GraphicObjectCollection();

    collezione.addGraphicObject(new ImageWidget("../Images/Caserma_L1.png", new Point2D(1,1), 20, 30));
    collezione.addGraphicObject(new ImageWidget("../Images/Caserma_L2.png", new Point2D(2,2), 10, 20));
    collezione.addGraphicObject(new ImageWidget("../Images/Caserma_L3.png   ", new Point2D(3,3), 30, 40));

    deepEqual(collezione.getLength(), 3, "Test su getLength");
    deepEqual(collezione.getGraphicObject(0).getTopLeftOffset(), new Point2D(3,3), "Test su add/getGraphicObject");
    collezione.removeGraphicObject(collezione.getGraphicObject(2));
    deepEqual(collezione.getGraphicObject(2), null, "Test su removeGraphicObject (1)");
    deepEqual(collezione.getGraphicObject(1).getTopLeftOffset(), new Point2D(2,2), "Test su removeGraphicObject (2)");

    collezione.addContextualFrame(new FrameWidget("Titolo", new Point2D(3,4)));
    deepEqual(collezione.getContextualFrame().getTopLeftOffset(),new Point2D(3,4) , "Test su add/getContextualFrame (true)");
    notDeepEqual(collezione.getContextualFrame().getTopLeftOffset(),new Point2D(3,5), "Test su add/getContextualFrame (false)");


    var iteratore = collezione.createIterator();
    deepEqual(iteratore.isDone(), false, "Test su isDone (false)");
    iteratore.next();
    deepEqual(iteratore.isDone(), false, "Test su isDone (false)");
    iteratore.next();
    deepEqual(iteratore.isDone(), true, "Test su isDone (true)");
    collezione.addGraphicObject(new ImageWidget("../Images/Caserma_L3.png", new Point2D(3,3), 30, 40));
    deepEqual(iteratore.isDone(), false, "Test su isDone (false)");
    collezione.addGraphicObject(new ImageWidget("../Images/Caserma_L3.png", new Point2D(3,3), 30, 40));
    iteratore.first();
    iteratore.next();
    iteratore.next();
    iteratore.next();
    iteratore.next();
    deepEqual(iteratore.isDone(), true, "Test su first");
    iteratore.last();
    deepEqual(iteratore.getItem(), new ImageWidget("../Images/Caserma_L2.png", new Point2D(2,2), 10, 20), "Test su last e getItem");
});