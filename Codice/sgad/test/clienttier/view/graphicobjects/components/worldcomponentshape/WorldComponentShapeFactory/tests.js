test("Test WorldComponentShapeFactory", function() {
	var worldComponentShapeFactory = WorldComponentShapeFactory.getInstance();
    deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("CasermaL1"), typeof new WorldComponentShapeImg(), "Ottenimento forma 001!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("CasermaL2"), typeof new WorldComponentShapeImg(), "Ottenimento forma 002!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("CasermaL3"), typeof new WorldComponentShapeImg(), "Ottenimento forma 003!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("InCostruzione"), typeof new WorldComponentShapeImg(), "Ottenimento forma 004!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("MinieraL1"), typeof new WorldComponentShapeImg(), "Ottenimento forma 005!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("MinieraL2"), typeof new WorldComponentShapeImg(), "Ottenimento forma 006!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("MinieraL3"), typeof new WorldComponentShapeImg(), "Ottenimento forma 007!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("Scuola di magiaL1"), typeof new WorldComponentShapeImg(), "Ottenimento forma 008!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("Scuola di magiaL2"), typeof new WorldComponentShapeImg(), "Ottenimento forma 009!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("Scuola di magiaL3"), typeof new WorldComponentShapeImg(), "Ottenimento forma 010!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("StallaL1"), typeof new WorldComponentShapeImg(), "Ottenimento forma 011!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("StallaL2"), typeof new WorldComponentShapeImg(), "Ottenimento forma 012!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("StallaL3"), typeof new WorldComponentShapeImg(), "Ottenimento forma 013!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("Tile"), typeof new WorldComponentShapeImg(), "Ottenimento forma 014!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("Torre dello stregoneL1"), typeof new WorldComponentShapeImg(), "Ottenimento forma 015!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("Torre dello stregoneL2"), typeof new WorldComponentShapeImg(), "Ottenimento forma 016!");
	deepEqual(typeof worldComponentShapeFactory.getWorldComponentShapeImg("Torre dello stregoneL3"), typeof new WorldComponentShapeImg(), "Ottenimento forma 017!");
});