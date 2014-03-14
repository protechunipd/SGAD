test("Test su WizardTowerL1Shape", function() {
	var wizardTowerL1Shape = new WizardTowerL1Shape();
	deepEqual(typeof wizardTowerL1Shape.getShape(), typeof new Shape(), "Test su getShape");
	deepEqual(typeof wizardTowerL1Shape.getImage(), typeof new Image(), "Test su getImage");
});