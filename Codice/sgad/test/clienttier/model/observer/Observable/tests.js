window.onload = function() {
	var observable = new Observable();
	var observer1 = new Observer();
	var observer2 = new Observer();
	var observer3 = new Observer();
	var observer4 = new Observer();
	observable.removeObserver(observer4);
	observable.addObserver(observer1);
	observable.addObserver(observer2);
	observable.addObserver(observer3);
	observable.notify();
};

test("Test su Observable", function() {

});