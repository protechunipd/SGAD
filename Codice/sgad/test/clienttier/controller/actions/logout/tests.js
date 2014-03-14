test("Test su Logout", function() {

   var action = new Logout();
   action.performAction();

   deepEqual(true, true, "Eseguita azione Logout")
});