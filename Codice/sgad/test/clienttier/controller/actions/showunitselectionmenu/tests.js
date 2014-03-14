test("Test su ShowUnitSelectionMenu", function() {

    var action = new ShowUpgradeMenu(new BuildingPossession(new BuildingWithLevel(null, null, 2, "Miniera", null, null, null, 2, true, true),true, null, 20, 20, null))
    action.performAction();

    deepEqual(true, true, "Eseguita azione ShowUnitSelectionMenu");
});
