/**
 * FILE: SetAllVoidFilter.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/SetAllVoidFilter.js
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-21 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
 SetAllVoidFilter.prototype = new Action();

//Costruttore della classe.
SetAllVoidFilter.prototype.constructor = SetAllVoidFilter;

/**
 * Classe per la gestione dei filtri standard.
 * @implements Action
 * @constructor
 */
function SetAllVoidFilter() {

}

/**
 * Imposta il filtro.
 * @override
 * @return {void}
 */
SetAllVoidFilter.prototype.performAction = function() {
	var context = Context.getInstance();
	var graphicObjects = context.getGraphicObjects();
	for(var iterator = graphicObjects.createIterator(); !iterator.isDone(); iterator.next()) {
		var graphicObject = iterator.getItem();
		if(graphicObject.setFilter)
			new VoidFilter(graphicObject);
	}
};