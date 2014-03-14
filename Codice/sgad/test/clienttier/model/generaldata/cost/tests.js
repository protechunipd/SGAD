test("Test su Cost", function() {
    var quant1 = new QuantityResource(10, new Resource("Pera"));
    var quant2 = new QuantityResource(5, new Resource("Mela"));
    var quant3 = new QuantityResource(50, new Resource("Banana"));

    var arrayRis = [quant1, quant2, quant3];
    var cos1 = new Cost(20, arrayRis);

    deepEqual(cos1.getRelativeTime(), 20, "Test su getRelativeTime");
    deepEqual(cos1.getQuantityResource()[2].getResource().getResourceName(), "Banana", "Test su getQuantityResource");

    var quant4 = new QuantityResource(10, new Resource("Pera"));
    var quant5 = new QuantityResource(5, new Resource("Mela"));
    var quant6 = new QuantityResource(50, new Resource("Banana"));

    var arrayRis2 = [quant4, quant5, quant6];
    var cos2 = new Cost(20, arrayRis2);

    deepEqual(cos1.valueOf(), cos2.valueOf(), "Test su valueOf (True)");
    deepEqual(cos2.valueOf()===(new QuantityResource(3, new Resource("banananana"))), false, "Test su valueOf (False)");
});
