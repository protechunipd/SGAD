test("Test su ButtonWidget", function() {
	var buttonWidget = new ButtonWidget("Cliccami!", new Point2D(20, 20), 60, 25);

    var canvas = document.getElementById("context5");
	canvas.width = 100;
	canvas.height = 100;
	var ctx = canvas.getContext("2d");
	buttonWidget.draw(ctx);
	deepEqual(buttonWidget.areYouClicked(new Point2D(40 , 22.5)), true, "Controllo cliccato Passed!");
	deepEqual(buttonWidget.areYouClicked(new Point2D(-40 , 22.5)), false, "Controllo non cliccato Passed!");
});