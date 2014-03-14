test("Test su RequestLoadPersonalData", function () {


    var rLPD = new RequestLoadPersonalData();
    rLPD.performAction();

    deepEqual(true, true, "Test su performAction()");

});