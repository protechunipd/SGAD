test("Test su MessageInterpreter", function() {
	var messageInterpreter = MessageInterpreter.getInstance();
	
	var json1 = {"data" : "value", "messages" : [{"op" : 0, "data": "abc"}, {"op" : 1, "data" : "def"}]};
	var json2 = {"data" : 2, "messages" : [{"op" : 0, "data": "abc"}, {"op" : 1, "data" : "def"}]};
	var json3 = {"messages" : [{"op" : 0, "data": "abc"}, {"op" : 1, "data" : "def"}]};
	var json4 = {"data" : null, "messages" : [{"op" : 0, "data": "abc"}, {"op" : 1, "data" : "def"}]};
	var json5 = {"data" : {"value" : 0}, "messages" : [{"op" : 0, "data": "abc"}, {"op" : 1, "data" : "def"}]};
	var json6 = {"data" : "", "messages" : [{"op" : 0, "data": "abc"}, {"op" : 1, "data" : "def"}]};
	var json7 = {"data" : ""};
	
	deepEqual(messageInterpreter.analyzeMessage(json1), "value", "Analisi stringa Passed!");
	deepEqual(messageInterpreter.analyzeMessage(json2), 2, "Analisi numero Passed!");
	deepEqual(messageInterpreter.analyzeMessage(json3), undefined, "Analisi dati non esistenti Passed!");
	deepEqual(messageInterpreter.analyzeMessage(json4), null, "Analisi null Passed!");
	deepEqual(messageInterpreter.analyzeMessage(json5).value, 0, "Analisi JSON Passed!");
	deepEqual(messageInterpreter.analyzeMessage(json6), "", "Analisi stringa vuota Passed!");
	deepEqual(messageInterpreter.analyzeMessage(json7), "", "Analisi senza messaggi Passed!");
});