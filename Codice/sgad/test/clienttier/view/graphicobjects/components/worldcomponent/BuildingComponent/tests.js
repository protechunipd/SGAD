test("Test su BuildingComponent", function() {
	var buildingComponent1 = new BuildingComponent(new BuildingPossession(new BuildingWithLevel(null,  null, 0, "InCostruzione", null, null, null, 0, true, true), true,  new Position(2,3), 60, 20, null), "InCostruzione");
	var tileComponent1 = new TileComponent(new Position(0, 2));
	var tileComponent2 = new TileComponent(new Position(1, 1));
	var buildingComponent4 = new BuildingComponent(new BuildingPossession(new BuildingWithLevel(null,  null, 0, "Tile", null, null, null, 0, true, true), true,  new Position(3,4), 60,20,  null), "Tile");
	var buildingComponent5 = new BuildingComponent(new BuildingPossession(new BuildingWithLevel(null,  null, 0, "Caserma", null, null, null, 0, true, true), true,  new Position(1,4), 60, 20, null), "CasermaL2");
	var buildingComponent6 = new BuildingComponent(new BuildingPossession(new BuildingWithLevel(null,  null, 0, "Caserma", null, null, null, 0, true, true), true,  new Position(4,4), 60, 20, null), "CasermaL2");
	new VoidFilter(buildingComponent1);
	new BuildModeFilter(buildingComponent4);
	new VoidFilter(buildingComponent5);
	new VoidFilter(buildingComponent6);
	
	Bound.getInstance().setWidth(screen.availWidth);
	Bound.getInstance().setHeight(screen.availHeight);
	
	var canvas = document.createElement("canvas");
	canvas.width = 700;
	canvas.height = 300;
	var ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
		buildingComponent1.draw(ctx);
		tileComponent1.draw(ctx);
		tileComponent2.draw(ctx);
		buildingComponent4.draw(ctx);
		buildingComponent5.draw(ctx);
		buildingComponent6.draw(ctx);
	
	deepEqual(true, true, "Passed!");
}); 