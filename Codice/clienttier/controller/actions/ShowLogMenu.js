/**
 * FILE: ShowLogMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowLogMenu.js
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ShowLogMenu.prototype = new Action();

//Costruttore della classe.
ShowLogMenu.prototype.constructor = ShowLogMenu;

/**
 * Classe per la visualizzazione di un oggetto LogMenu
 * @implements Action
 * @constructor
 * @param {Array.<string>} events
 */
function ShowLogMenu(events) {
    /**
     *
     * @type {Array.<string>}
     * @private
     */
    this.events = events;
}

/**
 * Esegue l'azione assegnata
 * @override
 * @return {void}
 */
ShowLogMenu.prototype.performAction = function() {
	var logMenu = (new LogMenuFactory(this.events)).buildMenu();

	var widgets = logMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(logMenu); //aggiungo il frame
};