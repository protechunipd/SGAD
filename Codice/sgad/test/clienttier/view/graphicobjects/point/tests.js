	
	test("Test su Point2D", function() {
	var punto = new Point2D(2,3);
	deepEqual(punto.getX(), 2, "Test getX");
	deepEqual(punto.getY(), 3, "Test getY");
	punto.setX(4);
	punto.setY(5);
	deepEqual(punto.getX(), 4, "Test setX");
	deepEqual(punto.getY(), 5, "Test setY");
	var punto2 = new Point2D(5,6);
	punto.addPoint2D(punto2);
	deepEqual(punto.getX(), 9, "Test addPoint2D (X)");
	deepEqual(punto.getY(), 11, "Test addPoint2D (Y)");
	punto.subPoint2D(punto2);
	deepEqual(punto.getX(), 4, "Test subPoint2D (X)");
	deepEqual(punto.getY(), 5, "Test subPoint2D (Y)");
    });