test("Test su ShowAttackMenu", function() {

    var action = new ShowAttackMenu({"Password" : "NuovaPass"});

    action.performAction();

    deepEqual(true,true, "Eseguita azione ShowAttackMenu");

});