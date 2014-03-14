test("Test su WorldComponentShapeIMG", function() {
	var worldComponentShapeImg = new WorldComponentShapeImg();
	deepEqual(typeof worldComponentShapeImg.getShape(), typeof new Shape(), "Ottenimento forma Passed!");
	deepEqual(typeof worldComponentShapeImg.getImage(), typeof new Image(), "Ottenimento immagine Passed!");
});