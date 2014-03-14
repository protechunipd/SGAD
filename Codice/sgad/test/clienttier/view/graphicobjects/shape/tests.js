

	test("Test su Shape", function() {
	var punto1 = new Point2D(1,1);
	var punto2 = new Point2D(1,2);
	var punto3 = new Point2D(2,3);
	var punto4 = new Point2D(3,2);
	var punto5 = new Point2D(5,3);
	var punto6 = new Point2D(3,0);
	var punto7 = new Point2D(2,-2);
	var prova_shape = new Shape();
	var prova_shape1 = new Shape();
	prova_shape.addPoint(punto1);
	prova_shape.addPoint(punto2);
	prova_shape.addPoint(punto3);
	prova_shape.addPoint(punto4);
	prova_shape.addPoint(punto5);
	prova_shape.addPoint(punto6);
	prova_shape.addPoint(punto7);
	var puntoTest = new Point2D(2,2);
	deepEqual(prova_shape.isPointInside(puntoTest),true);
	puntoTest = new Point2D(0,0);
	deepEqual(prova_shape.isPointInside(puntoTest),false);
	puntoTest = new Point2D(3,3);
	deepEqual(prova_shape.isPointInside(puntoTest),false);
	puntoTest = new Point2D(2,4);
	deepEqual(prova_shape.isPointInside(puntoTest),false);
	prova_shape.removePoint(punto1);
	puntoTest = new Point2D(1,1);
	deepEqual(prova_shape.isPointInside(puntoTest),false);
	puntoTest = new Point2D(3,1);
	deepEqual(prova_shape.isPointInside(puntoTest),true);
	puntoTest = new Point2D(4,1);
	deepEqual(prova_shape.isPointInside(puntoTest),false);
	puntoTest = new Point2D(4,2);
	deepEqual(prova_shape.isPointInside(puntoTest),true);
	puntoTest = new Point2D(2,-1);
	deepEqual(prova_shape.isPointInside(puntoTest),true);
	puntoTest = new Point2D(2,-3);
	deepEqual(prova_shape.isPointInside(puntoTest),false);
	prova_shape.removePoint(punto6);
	prova_shape.removePoint(punto5);
	puntoTest = new Point2D(4,2);
	deepEqual(prova_shape.isPointInside(puntoTest),false);
	puntoTest = new Point2D(-1,2);
	deepEqual(prova_shape.isPointInside(puntoTest),false);
	deepEqual(prova_shape1.isPointInside(puntoTest),false);
    });
    