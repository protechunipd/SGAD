test("Test su ActionListener", function () {
    if (Action == undefined ) { var Action = function(str) {
        this.getVar = function() {
            return this.variabile;
        };
        this.performAction = function() {
            this.variabile = str ;
        };
    };}

    var action1 = new Action("Primo");
    var action2 = new Action("Secondo");

    var listener = new ActionListener();
    listener.addAction(action1);

    deepEqual(action1.getVar(),undefined,"Test performAction");
    listener.performAction();
    notDeepEqual(action1.getVar(),"undefined","Test performAction");
    deepEqual(action1.getVar(),"Primo","Test performAction");

    deepEqual(action2.getVar(),undefined,"Test addAction");
    listener.addAction(action2);
    deepEqual(action2.getVar(),undefined,"Test addAction");
    listener.performAction();
    deepEqual(action2.getVar(),"Secondo","Test addAction/performAction");
});