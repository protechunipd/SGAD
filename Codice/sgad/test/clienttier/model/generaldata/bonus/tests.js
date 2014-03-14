test("Test su Bonus", function() {
    var bon1 = new Bonus("bonus1", 20.7336, 30);
    var bon2 = new Bonus("bonus2", 18.272, 20);

    deepEqual(bon1.getBonusName(), "bonus1", "Test su getBonusName");
    deepEqual(bon2.getBonusQuantity(), 18.272, "Test su getBonusQuantity");
    deepEqual(bon1.getBonusType(), 30, "Test su getBonusType");

    deepEqual(bon1.valueOf(), new Bonus("bonus1", 20.7336, 30).valueOf(), "Test su valueOf (true)");
    deepEqual(bon1.valueOf() === bon2.valueOf(), false, "Test su valueOf (false)");

    var b1 = new Bonus("pluto", 4.0, 7);
	var b2 = new Bonus("pippo", 4.0, 7);
	var b3 = new Bonus("paperino", 2.0, 1);
	var b4 = new Bonus("pluto", 1.0, 3);

	deepEqual(b1.getBonusName(), "pluto", "Test su getBonusName");
	notDeepEqual(b1.getBonusName(), b2.getBonusName(), "Test su getBonusName");
	deepEqual(b1.getBonusName(), b4.getBonusName(), "Test su getBonusName");

	deepEqual(b4.getBonusQuantity(), 1.0, "Test su getBonusQuantity");
	notDeepEqual(b4.getBonusQuantity(), "1", "Test su getBonusQuantity");
	deepEqual(b1.getBonusQuantity(), b2.getBonusQuantity(), "Test su getBonusQuantity");
	notDeepEqual(b3.getBonusQuantity(), b4.getBonusQuantity(), "Test su getBonusQuantity");

	deepEqual(b4.getBonusType(), 3, "Test su getBonusType");
	notDeepEqual(b4.getBonusType(), "3", "Test su getBonusType");
	deepEqual(b1.getBonusType(), b2.getBonusType(), "Test su getBonusType");
	notDeepEqual(b3.getBonusType(), b4.getBonusType(), "Test su getBonusType");
});