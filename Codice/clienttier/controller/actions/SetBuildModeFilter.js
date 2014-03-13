/**
 * FILE: SetBuildModeFilter.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/SetBuildModeFilter.js
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
SetBuildModeFilter.prototype = new Action();

//Costruttore della classe.
SetBuildModeFilter.prototype.constructor = SetBuildModeFilter;

/**
 * Classe filtro per la modalità di costruzione.
 * @implements Action
 * @constructor
 */
function SetBuildModeFilter() {

}

/**
 * Filtra la modalità di costruzione.
 * @override
 * @return {void}
 */
SetBuildModeFilter.prototype.performAction = function() {
	var context = Context.getInstance();
	var graphicObjects = context.getGraphicObjects();
	for(var iterator = graphicObjects.createIterator(); !iterator.isDone(); iterator.next()) {
		var graphicObject = iterator.getItem();
		if(graphicObject.setFilter)
			new BuildModeFilter(graphicObject);
	}
};