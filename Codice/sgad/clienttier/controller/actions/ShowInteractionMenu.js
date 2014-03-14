/**
 * FILE: ShowInteractionMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowInteractionMenu.js
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
ShowInteractionMenu.prototype = new Action();

//Costruttore della classe.
ShowInteractionMenu.prototype.constructor = ShowInteractionMenu;

/**
 * Classe che visualizza il menù di interazione con il mondo di gioco e i vari utenti.
 * @implements Action
 * @constructor
 */
function ShowInteractionMenu() {}

/**
 * Si occupa di mostrare all'utente il menù.
 * @override
 * @return {void}
 */
ShowInteractionMenu.prototype.performAction = function() {
	var interactionMenu = (new InteractionMenuFactory()).buildMenu();

	var widgets = interactionMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(interactionMenu); //aggiungo il frame
};