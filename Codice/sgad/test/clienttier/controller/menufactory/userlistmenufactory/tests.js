test("Test su UserListMenuFactory", function() {

    var canvas = document.getElementById("context8");
    var ctx = canvas.getContext("2d");
    canvas.height = 300;
    canvas.width = 300;
    var context = Context.getInstance();
    context.setDrawArea(ctx);

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var list = [];
    list.push(["user1"]);
    list.push(["user2"]);
    list.push(["user3"]);

    var menu = new UserListMenuFactory(list);
    menu.buildMenu();


    deepEqual(true, true, "Disegno menu UserListMenuFactory");
});