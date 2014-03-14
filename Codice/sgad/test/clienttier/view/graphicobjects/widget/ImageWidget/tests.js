

test("Test su ImageWidget", function() {
    if (Action == undefined ) { var Action = function() {
        this.getVar = function() {
            return this.variabile;
        };
        this.performAction = function() {
            this.variabile = 25678 ;
        };
    };}
	var imgwidg = new ImageWidget("icona.jpg", new Point2D(0,0), 100, 100);
	deepEqual(imgwidg.getHeight(), 100, "Test su getHeight ereditato");
	deepEqual(imgwidg.getWidth(), 100, "Test su getWidtht ereditato");
	
	var azione = new Action();
	imgwidg.setOnClickEvent(azione);
	imgwidg.onClick();
	deepEqual(azione.getVar(), 25678, "Test su onClick");

	imgwidg.setOnRightClickEvent(azione);
	imgwidg.onRightClick();
	deepEqual(azione.getVar(), 25678, "Test su onRightClick");

	deepEqual(imgwidg.getTopLeftOffset().getX(), 0, "Test su getTopLeftOffset ereditato");
	
	imgwidg.setEnabled(false);

    var canvas = document.getElementById("context7");
	canvas.width = 100;
	canvas.height = 100;
	var ctx = canvas.getContext("2d");
	setTimeout(function() {imgwidg.draw(ctx);}, 500);
	
	var imgwidg2 = new ImageWidget("mcd.png", new Point2D(0,0), 20, 30);
	setTimeout(function() {imgwidg2.draw(ctx);}, 500);
});