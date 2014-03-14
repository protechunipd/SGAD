test("Test su GraphicObject, Shift", function() {
	var graphicObject = new GraphicObject();

	deepEqual(graphicObject.getIsShiftable(), true, "Inizializzazione traslabile Passed!");
	deepEqual(graphicObject.getTopLeftOffset().getX(), 0, "Inizializzazione topLeftOffset Passed!");
	deepEqual(graphicObject.getTopLeftOffset().getY(), 0, "Inizializzazione topLeftOffset Passed!");

	graphicObject.shiftPosition(new Point2D(40, 20));
	deepEqual(graphicObject.getIsShiftable(), true, "Modifica traslabile Passed!");
	deepEqual(graphicObject.getTopLeftOffset().getX(), 40, "Modifica topLeftOffset Passed!");
	deepEqual(graphicObject.getTopLeftOffset().getY(), 20, "Modifica topLeftOffset Passed!");

	graphicObject.shiftPosition(new Point2D(40, 20));
	deepEqual(graphicObject.getTopLeftOffset().getX(), 80, "Altra traslazione Passed!");
	deepEqual(graphicObject.getTopLeftOffset().getY(), 40, "Altra traslazione Passed!");

	graphicObject.setIsShiftable(false);
	graphicObject.shiftPosition(new Point2D(40, 20));
	deepEqual(graphicObject.getIsShiftable(), false, "Modifica traslabile Passed!");
	deepEqual(graphicObject.getTopLeftOffset().getX(), 80, "Traslazione impedita Passed!");
	deepEqual(graphicObject.getTopLeftOffset().getY(), 40, "Traslazione impedita Passed!");

	graphicObject.setIsShiftable(true);
	graphicObject.shiftPosition(new Point2D(-40, -20));
	deepEqual(graphicObject.getIsShiftable(), true, "Modifica traslabile Passed!");
	deepEqual(graphicObject.getTopLeftOffset().getX(), 40, "Traslazione permessa Passed!");
	deepEqual(graphicObject.getTopLeftOffset().getY(), 20, "Traslazione permessa Passed!");
});

test("Test su GraphicObject, areYouClicked", function() {
	var graphicObject = new Widget();
			
	deepEqual(graphicObject.areYouClicked(new Point2D(10, 10)), false, "Punto interno Passed!");
	deepEqual(graphicObject.areYouClicked(new Point2D(0, 10)), false, "Punto interno sul bordo Passed!");
	deepEqual(graphicObject.areYouClicked(new Point2D(0, 0)), false, "Punto interno sul vertice Passed!");
	deepEqual(graphicObject.areYouClicked(new Point2D(-1, 0)), false, "Punto esterno Passed!");

	graphicObject.shiftPosition(new Point2D(40, 20));
	deepEqual(graphicObject.areYouClicked(new Point2D(50, 30)), false, "Punto interno con traslazione Passed!");
	deepEqual(graphicObject.areYouClicked(new Point2D(40, 30)), false, "Punto interno sul bordo con traslazione Passed!");
	deepEqual(graphicObject.areYouClicked(new Point2D(40, 20)), false, "Punto interno sul vertice con traslazione Passed!");
	deepEqual(graphicObject.areYouClicked(new Point2D(39, 20)), false, "Punto esterno con traslazione Passed!");
});