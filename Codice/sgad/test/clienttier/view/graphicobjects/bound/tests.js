test("Test su Bound", function() {
	var bound = Bound.getInstance();
	deepEqual(bound.getHeight(), 0, "Test get/setHeight");
	deepEqual(bound.getWidth(), 0, "Test get/setWidth");

	bound.setHeight(100);
	bound.setWidth(200);
	deepEqual(bound.getHeight(), 100, "Test get/setHeight");
	deepEqual(bound.getWidth(), 200, "Test get/setWidth");

	var punto = new Point2D(10,5);
	bound.setTopLeftOffset(punto);
	deepEqual(bound.getTopLeftOffset().getX(), 10, "Test get/setTopLeftOffset (X)");
	deepEqual(bound.getTopLeftOffset().getY(), 5, "Test get/setTopLeftOffset (Y)");

	var puntomin = new Point2D(1,2);
	bound.setMinTopLeftOffset(puntomin);
	deepEqual(bound.getMinTopLeftOffset().getX(), 1, "Test get/setMinTopLeftOffset (X)");
	deepEqual(bound.getMinTopLeftOffset().getY(), 2, "Test get/setMinTopLeftOffset (X)");

	var puntomax = new Point2D(80,90);
	bound.setMaxTopLeftOffset(puntomax);
	deepEqual(bound.getMaxTopLeftOffset().getX(), 80, "Test get/setMaxTopLeftOffset (X)");
	deepEqual(bound.getMaxTopLeftOffset().getY(), 90, "Test get/setMaxTopLeftOffset (X)");

    bound.shift(new Point2D(4, 4));
    deepEqual(bound.getTopLeftOffset().getX(), -120, "Teest shift (X)");
    deepEqual(bound.getTopLeftOffset().getY(), -10, "Test shift (Y)");

    bound.shift(new Point2D(4,4));
    deepEqual(bound.getTopLeftOffset().getX(), 1, "Test shift (X)");
    deepEqual(bound.getTopLeftOffset().getY(), 2, "Test shift (Y)");


    bound.shift(new Point2D(-100, -70));
    deepEqual(bound.getTopLeftOffset().getX(), -120, "Test shift (X)");
    deepEqual(bound.getTopLeftOffset().getY(), -10, "Test shift (Y)");

	var nuovobound = Bound.getInstance();
	deepEqual(nuovobound.getHeight(), 100, "Test istanza singola");
	deepEqual(nuovobound.getWidth(), 200, "Test istanza singola");

	nuovobound.setHeight(20);
	nuovobound.setWidth(40);
	deepEqual(bound.getHeight(), 20, "Test istanza singola #2");
	deepEqual(bound.getWidth(), 40, "Test istanza singola #2");
	});
    