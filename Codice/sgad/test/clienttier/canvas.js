window.onload = function() {
    var canvas = document.getElementById("context1");
    var ctx = canvas.getContext("2d");

	var bound = Bound.getInstance();
	bound.setWidth(window.innerWidth);
	bound.setHeight(window.innerHeight);

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var context = Context.getInstance();
	context.setDrawArea(ctx);

	canvas.onclick = function() {
		context.onClick();
	};

	canvas.oncontextmenu = function() {
		context.onRightClick();
		return false;
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

	canvas.ontouchenter = function() {
		alert(event);
		context.onDragStart();
	};

	canvas.ontouchmove = function() {
		alert(event);
		context.onDrag();
	};

	canvas.ontouchend = function() {
		alert(event);
		context.onDragEnd();
	};

    var requestLoadGlobalData = new RequestLoadGeneralData();

    requestLoadGlobalData.performAction();

	context.startDraw();
};