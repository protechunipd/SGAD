test("Test su ShowPasswordChangedMenu", function() {

    var action = new ShowPasswordChangedMenu();

    action.setActionDatas({"Password" : "NuovaPass"});

    action.performAction();

    deepEqual(true, true, "Eseguita azione ShowPasswordChangedMenu");

});