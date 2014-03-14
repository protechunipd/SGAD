test("Test su ShowDemolishMenu", function() {

    var action = new ShowDemolishMenu(new BuildingComponent(new BuildingPossession(new BuildingWithLevel(new Bonus("bon1", 20.30, 2), new Cost(10, null), 2, "Stalla", null, new ProductedResource(10,5,2, new Resource("Pera")), null, 2, true, true),true, new Position(2,2), 20, 20, new UnitInProgress(20, new Unit("Cavaliere", 20, 20, null),20)),"Caserma"));
    action.performAction();

    deepEqual(true, true, "Eseguita azione ShowDemolishMenu");

});
