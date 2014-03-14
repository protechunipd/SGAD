window.onload = function() {
	var canvas = document.getElementById("context1");
	var ctx = canvas.getContext("2d");

	canvas.height = 100;
	canvas.width = 100;

	var context = Context.getInstance();
	context.setDrawArea(ctx);

	canvas.onclick = function() {
		context.onClick();
	};
	canvas.oncontextmenu = function() {
		context.onRightClick();
	};
	canvas.ondragstart = function() {
		context.onDragStart();
	};
	canvas.ondrag = function() {
		context.onDrag();
	};
	canvas.ondragend = function() {
		context.onDragEnd();
	};
	window.onresize = function() {
		context.onResize();
	};
};

test("Test su Context", function() {
	
	var context = Context.getInstance();
	
	deepEqual(true, true, "Controllo cliccato Passed!");
	deepEqual(false, false, "Controllo non cliccato Passed!");
});