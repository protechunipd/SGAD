test("Test su SetAllVoidFilter", function () {

	var setAllVoidFilter = new SetAllVoidFilter();
	setAllVoidFilter.performAction();

	var context = Context.getInstance();

	var graphicObjects = context.getGraphicObjects().graphicObjects;

	for(var i = 0; i < graphicObjects.length; i++)
		if(graphicObjects[i].filter !== undefined)
			deepEqual(typeof graphicObjects[i].filter, "object", "Test su VoidFilter");

});