test("Test su ShowBuildConstructionMenu", function() {

    var action = new ShowBuildConstructionMenu(new TileComponent(new Position(20,12)), "Caserma");

    action.performAction();

    deepEqual(true, true, "Eseguita azione ShowBuildConstructionMenu");

});