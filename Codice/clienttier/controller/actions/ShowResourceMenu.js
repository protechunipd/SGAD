/**
 * FILE: ShowResourceMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowResourceMenu.js
 * DATA CREAZIONE: 22 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-22 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ShowResourceMenu.prototype = new Action();

//Costruttore della classe.
ShowResourceMenu.prototype.constructor = ShowResourceMenu;

/**
 * Classe per la gestione della visualizzazione di un menu per selezionare le risorse da donare ad un altro utente.
 * @implements Action
 * @constructor
 */
function ShowResourceMenu() {

}

/**
 * Visualizza il menu delle risorse da donare.
 * @override
 * @return {void}
 */
ShowResourceMenu.prototype.performAction = function() {
	var resourceMenu = (new ResourceMenuFactory()).buildMenu();

	var widgets = resourceMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(resourceMenu); //aggiungo il frame
};