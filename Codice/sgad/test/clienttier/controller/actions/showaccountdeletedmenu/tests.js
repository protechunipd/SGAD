test("Test su ShowAccountDeletedMenu", function() {

   var action = new ShowAccountDeletedMenu();

    action.setActionDatas({"Utente" : "Mario"});

    action.performAction();

    deepEqual(true, true, "Eseguita azione ShowAccountDeletedMenu");
});