test("Test su ShowOperationFailureMenu", function() {
    var action = new ShowOperationFailureMenu();

    action.performAction();

    deepEqual(true, true, "Azione ShowOperationFailureMenu eseguita");
});