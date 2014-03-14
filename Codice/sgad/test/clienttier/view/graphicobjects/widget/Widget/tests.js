test("Test su Widget", function() {
   if (Action == undefined ) { var Action = function() {
        this.getVar = function() {
            return this.variabile;
        };
        this.performAction = function() {
            this.variabile = 25678 ;
        };
    };}
	var widg = new Widget();
	widg.setEnabled(true);
	deepEqual(widg.getEnabled(), true, "Test get/setEnabled true");
	widg.setEnabled(false);
	deepEqual(widg.getEnabled(), false, "Test get/setEnabled false");
	
	var azione1 = new Action();
	var azione2 = new Action();
	widg.setOnClickEvent(azione1);
	widg.setOnRightClickEvent(azione2);
	var azione3 = new Action();
	var azione4 = new Action();
	deepEqual(typeof(widg.getOnClickEvent()), typeof(azione3), "Test get/setOnClickEvent");
	deepEqual(typeof(widg.getOnRightClickEvent()), typeof(azione4), "Test get/setOnRightClickEvent");
	
	deepEqual(widg.getHeight(), 0, "Test su getHeight");
	deepEqual(widg.getWidth(), 0, "Test su getWidth");
});