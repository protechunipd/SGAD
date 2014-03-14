test("Test su Resource", function() {
	var res = new Resource("Risorsa1");
	var res7 = new Resource("Risorsa1");
	var res8 = new Resource("Risorsa2");
	
	deepEqual(res.getResourceName(), "Risorsa1", "Test su getResourceName");
    deepEqual(res.valueOf(), res7.valueOf(), "Test su valueOf (true)");
    deepEqual(res.valueOf()==res7.valueOf(), true , "Test su valueOf (true)");
	deepEqual(res.valueOf()===res8.valueOf(), false, "Test su valueOf (false)");
    deepEqual(res.getKey(), "Risorsa1", "Test su getKey");

	});
    