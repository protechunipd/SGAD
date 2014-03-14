asyncTest("Trasmissione asincrona 1ms", 1, function() {
	var request = "\"op\" : 12";
	var onSuccess2 = new Action();
	var onFailure2 = new Action();
	var ajax2 = new AJAXRequester(request, onSuccess2, onFailure2);
	ajax2.sendRequest(false);

	setTimeout(function() {
		deepEqual(onSuccess2.getActionDatas(), undefined, "Trasmissione asincrona delay 1ms Passed!");
		start();
	}, 1);
});

asyncTest("Trasmissione asincrona 8ms", 1, function() {
	var request = "\"op\" : 12";
	var onSuccess2 = new Action();
	var onFailure2 = new Action();
	var ajax2 = new AJAXRequester(request, onSuccess2, onFailure2);
	ajax2.sendRequest(false);

	setTimeout(function() {
		deepEqual(onSuccess2.getActionDatas(), 2, "Trasmissione asincrona delay 8ms Passed!");
		start();
	}, 8);
});

asyncTest("Trasmissione asincrona 16ms", 1, function() {
	var request = "\"op\" : 12";
	var onSuccess2 = new Action();
	var onFailure2 = new Action();
	var ajax2 = new AJAXRequester(request, onSuccess2, onFailure2);
	ajax2.sendRequest(false);

	setTimeout(function() {
		deepEqual(onSuccess2.getActionDatas(), 2, "Trasmissione asincrona delay 16ms Passed!");
		start();
	}, 16);
});

asyncTest("Trasmissione asincrona fallita", 1, function() {
	var request = "\"op\" : 12";
	var onSuccess2 = new Action();
	var onFailure2 = new Action();
	var ajax2 = new AJAXRequester(request, onSuccess2, onFailure2);
	ajax2.sendRequest(false);

	setTimeout(function() {
		deepEqual(onFailure2.getActionDatas(), "Trasmissione fallita!", "Trasmissione fallita Passed!");
		start();
	}, 10000);
});