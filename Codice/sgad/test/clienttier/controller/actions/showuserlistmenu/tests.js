test("Test su ShowUserListMenu", function() {

    var action = new ShowUserListMenu();

    action.setActionDatas([{user1: "Piero"}, {user2: "Mario"}]);

    action.performAction();

    console.log(action.datas);
    deepEqual(action.datas[1], {"user2": "Mario"}  , "Eseguita azione ShowUserListMenu");

});