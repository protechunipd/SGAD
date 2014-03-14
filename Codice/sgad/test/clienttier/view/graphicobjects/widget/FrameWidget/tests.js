test("Test su FrameWidget", function() {
	var text = "Wikipedia prese il via come progetto complementare di Nupedia, un progetto per la creazione di una enciclopedia libera online le cui voci erano scritte da esperti attraverso un processo formale di revisione. Nupedia venne fondata il 9 marzo 2000 dalla societa' Bomis, proprietaria dell'omonimo portale di ricerca. Le figure principali erano Jimmy Wales, allora CEO della Bomis, e Larry Sanger, redattore capo di Nupedia e successivamente di Wikipedia.";
	var textWidget = new TextWidget(text, new Point2D(0, 0), 200);
	var buttonWidgetOk = new ButtonWidget("OK!", new Point2D(120, 10 + textWidget.getHeight()), 80, 25);
	var buttonWidgetDecline = new ButtonWidget("ANNULLA!", new Point2D(0, 10 + textWidget.getHeight()), 80, 25);
	var frameWidget = new FrameWidget("Il nostro primo frame", new Point2D(20, 20));
	frameWidget.addWidget(textWidget);
	frameWidget.addWidget(buttonWidgetDecline);
	frameWidget.addWidget(buttonWidgetOk);
	
	var otherTextWidget = new TextWidget(text, new Point2D(0, 0), 150);
	var otherButtonWidgetOk = new ButtonWidget("OK!", new Point2D(90, 10 + otherTextWidget.getHeight()), 80, 25);
	var otherButtonWidgetDecline = new ButtonWidget("ANNULLA!", new Point2D(0, 10 + otherTextWidget.getHeight()), 80, 25);
	var otherFrameWidget = new FrameWidget("Il nostro primo inner frame", new Point2D(12.5, frameWidget.getHeight() - 10));
	otherFrameWidget.addWidget(otherButtonWidgetDecline);
	otherFrameWidget.addWidget(otherButtonWidgetOk);
	otherFrameWidget.addWidget(otherTextWidget);
	frameWidget.addWidget(otherFrameWidget);
    var canvas = document.getElementById("context4");
	canvas.width = 100;
	canvas.height = 100;
	var ctx = canvas.getContext("2d");
	frameWidget.draw(ctx);
	deepEqual(frameWidget.areYouClicked(new Point2D(20, 20)), true, "Controllo cliccato!");
	deepEqual(frameWidget.areYouClicked(new Point2D(-8000, 22.5)), false, "Controllo non cliccato!");
});