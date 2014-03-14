test("Test su DataFactory", function() {
	var data = DataFactory.getInstance();

	var ris1 = new Resource("pane");
	var ris2 = new Resource("miele");
	var ris3 = new Resource("nutella");
	
	var arrayrisorse = {"pan":ris1, "miel":ris2, "nut":ris3};
	
	var ris4 = new Resource("cavolo");
	var ris5 = new Resource("capra");
	var ris6 = new Resource("mucca");
	
	var arrayrisorse2 = {"cav":ris4, "cap":ris5, "muc":ris6};
	
	data.setResources(arrayrisorse);
	deepEqual(data.getResource("pan"), ris1, "Test su get/setResource");

	var data2 = DataFactory.getInstance();
	data2.setResources(arrayrisorse2);
	deepEqual(data.getResource("muc"), data2.getResource("muc"), "Test su get/setResource su nuova istanza");


    var uni1 = new Unit("cavaliere", 5, 6, null);
    var uni2 = new Unit("pedone", 5, 6, null);

    var arrayunits = {"cav" : uni1, "ped" : uni2};

    data.setUnits(arrayunits);
    deepEqual(data.getUnit("cav"), uni1, "Test su get/setUnits");

    var buil1 = new BuildingWithLevel(null,  null, 2, "stalla", null, null, null, 2, true);
    var buil2 = new BuildingWithLevel(null,  null, 3, "torre", null, null, null, 3, false);

    var arraybuild = {"sta" : buil1, "tor" : buil2};

    data.setBuildings(arraybuild);
    deepEqual(data.getBuilding("tor"), buil2, "Test su get/setBuilding");

});