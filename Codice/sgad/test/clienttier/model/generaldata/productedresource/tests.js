test("Test su ProductedResource", function() {

    var ris1 = new ProductedResource(20, 10, 5, new Resource("Banana"));
    var ris2 = new ProductedResource(15, 5, 8, new Resource("Pera"));
    var ris3 = new ProductedResource(20, 10, 5, new Resource("Banana"));

    deepEqual(ris1.getMaxQuantity(), 20, "Test su getMaxQuantity");
    deepEqual(ris2.getRelativeTime(), 8, "Test su getRelativeTime");
    deepEqual(ris3.getQuantity(), 10, "Test su getQuantity");
    deepEqual(ris1.valueOf(), ris3.valueOf(), "Test su valueOf (true)");
    deepEqual(ris1.valueOf() === ris2.valueOf(),false, "Test su valueOf (false)");

    var r1 = new Resource("pluto");
	var r2 = new Resource("pippo");
	var r3 = new Resource("");

	var pr1 = new ProductedResource(10, 2, 3, r1);
	var pr2 = new ProductedResource(5, 2, 3, r2);
	var pr3 = new ProductedResource(24, 5, 3, r3);
	var pr4 = new ProductedResource(10, 4, 2, r2);

    deepEqual(pr1.getMaxQuantity(), 10, "Test su getMaxQuantity");
	notDeepEqual(pr1.getMaxQuantity(), pr2.getMaxQuantity(), "Test su getMaxQuantity");
	deepEqual(pr1.getMaxQuantity(), pr4.getMaxQuantity(), "Test su getMaxQuantity");

	deepEqual(pr4.getQuantity(), 4, "Test su getQuantity");
	notDeepEqual(pr4.getQuantity(), "4", "Test su getQuantity");
	deepEqual(pr1.getQuantity(), pr2.getQuantity(), "Test su getQuantity");
	notDeepEqual(pr3.getQuantity(), pr4.getQuantity(), "Test su getQuantity");

	deepEqual(pr4.getRelativeTime(), 2, "Test su getRelativeTime");
	notDeepEqual(pr4.getRelativeTime(), "2", "Test su getRelativeTime");
	deepEqual(pr1.getRelativeTime(), pr2.getRelativeTime(), "Test su getRelativeTime");
	notDeepEqual(pr3.getRelativeTime(), pr4.getRelativeTime(), "Test su getRelativeTime");

	deepEqual(pr2.getResource(), pr4.getResource(), "Test su getResource");
	notDeepEqual(pr1.getResource(), pr4.getResource(), "Test su getResource");
	notDeepEqual(pr3.getResource().getResourceName(), pr4.getResource().getResourceName(), "Test su getResource");
	deepEqual(pr2.getResource().getResourceName(), pr4.getResource().getResourceName(), "Test su getResource");
	deepEqual(pr1.getResource().getResourceName(), "pluto", "Test su getResource");
	deepEqual(pr3.getResource().getResourceName(), "", "Test su getResource");
});
    