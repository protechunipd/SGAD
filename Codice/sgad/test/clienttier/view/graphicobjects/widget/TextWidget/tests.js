var observable = new Observable();
observable.getState = function() {
	return 200;
};

test("Test su TextWidget, Draw", function() {
	var text = "Wikipedia prese il via come progetto complementare di Nupedia, un progetto per la creazione di una enciclopedia libera online le cui voci erano scritte da esperti attraverso un processo formale di revisione. Nupedia venne fondata il 9 marzo 2000 dalla societa' Bomis, proprietaria dell'omonimo portale di ricerca. Le figure principali erano Jimmy Wales, allora CEO della Bomis, e Larry Sanger, redattore capo di Nupedia e successivamente di Wikipedia.";
	var textWidget1 = new TextWidget(text, new Point2D(40, 50), 200);
	var textWidget2 = new TextWidget(text, new Point2D(80, 90), 200);
	var textWidget3 = new TextWidget(text, new Point2D(120, 130), 200);

	var canvas = document.createElement("canvas");
	canvas.width = 100;
	canvas.height = 100;
	var ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	textWidget1.draw(ctx);
	textWidget2.draw(ctx);
	textWidget3.draw(ctx);
	deepEqual(textWidget1.areYouClicked(new Point2D(50, 62.5)), true, "Controllo cliccato!");
	deepEqual(textWidget1.areYouClicked(new Point2D(-40, 22.5)), false, "Controllo non cliccato!");
});

asyncTest("Test su TextWidget, Update", 1, function() {
	var text = "Wikipedia prese il via come progetto complementare di Nupedia, un progetto per la creazione di una enciclopedia libera online le cui voci erano scritte da esperti attraverso un processo formale di revisione. Nupedia venne fondata il 9 marzo 2000 dalla societa' Bomis, proprietaria dell'omonimo portale di ricerca. Le figure principali erano Jimmy Wales, allora CEO della Bomis, e Larry Sanger, redattore capo di Nupedia e successivamente di Wikipedia.";
	var textWidget1 = new TextWidget(text, new Point2D(40, 50), 200);
	var textWidget2 = new TextWidget(text, new Point2D(80, 90), 200);
	var textWidget3 = new TextWidget(text, new Point2D(120, 130), 200);


    var canvas = document.getElementById("context6");
    canvas.width = 100;
    canvas.height = 100;

    var ctx = canvas.getContext("2d");
	setTimeout(function() {
		observable.notify();
		textWidget1.draw(ctx);
		textWidget2.draw(ctx);
		textWidget3.draw(ctx);
		deepEqual(typeof textWidget1.getText(), typeof([]), "Trasmissione asincrona delay 1ms!");
		start();
	}, 100);
}); 