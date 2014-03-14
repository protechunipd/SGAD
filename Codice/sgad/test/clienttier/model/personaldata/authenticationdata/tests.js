test("Test su AuthenticationData", function() {
    var aut1 = new AuthenticationData("prova@prova.pr", "prova");
    var aut2 = new AuthenticationData("utente@utente.ut", "utente");
    var aut3 = new AuthenticationData("prova@prova.pr", "prova");

    deepEqual(aut1, aut3, "test su valueOf (true)");
    notDeepEqual(aut2, aut3, "test su valueOf (false)");

    deepEqual(aut1.getEmail(), "prova@prova.pr", "Test su getEmail");
    deepEqual(aut2.getUser(), "utente", "Test su getUser");

});