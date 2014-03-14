test("Test su VoidFilter", function() {
	var buildings =[];
	for(var i = 0; i < 1; i++)
    	for(var j = 0; j < 3; j++)
            buildings.push(new VoidFilter(new BuildingComponent(new BuildingPossession(new BuildingWithLevel(null, null, 2, "Stalla", null, null, null, 1, true, true), true, new Position(i,j), 4, 20, null), "StallaL2")));

    var canvas = document.getElementById("context3");
    canvas.width = 300;
    canvas.height = 200;
    var ctx = canvas.getContext("2d");
    setTimeout(function() {
    	for(var i = 0; i < buildings.length; i++)
    		buildings[i].draw(ctx);
    }, 50);
	deepEqual(0, 0, "Passed!");
});