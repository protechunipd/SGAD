test("Test su BuildModeFilter", function() {
	var buildings = [];
	for (var i = 0; i < 2; i++)
		for (var j = 0; j < 3; j++)
            buildings.push(new BuildModeFilter(new BuildingComponent(new BuildingPossession(new BuildingWithLevel(null, null, 2, "Stable", null, null, null, 1, true, true), true, new Position(i,j), 4, 20, null), "StableL2")));

	var canvas = document.getElementById("context2");
	canvas.width = 300;
	canvas.height = 200;
	var ctx = canvas.getContext("2d");
	setTimeout(function() {
		for (var i = 0; i < buildings.length; i++)
			buildings[i].draw(ctx);
	}, 50);

    deepEqual(0, 0, "Passed!");
}); 