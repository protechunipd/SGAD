/**
 * FILE: ShowAnotherUserMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowAnotherUserMenu.js
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
ShowAnotherUserMenu.prototype = new Action();

//Costruttore della classe.
ShowAnotherUserMenu.prototype.constructor = ShowAnotherUserMenu;

/**
 * Classe per la visualizzazione del menù per ritornare al proprio villaggio una volta che si è nel villaggio di un altro utente.
 * @implements Action
 * @constructor
 */
function ShowAnotherUserMenu() {}

/**
 * Visualizza il menu per ritornare al proprio villaggio una volta che si è nel villaggio di un altro utente.
 * @override
 * @return {void}
 */
ShowAnotherUserMenu.prototype.performAction = function() {
	var anotherUserMenu = (new AnotherUserMenuFactory()).buildMenu();

	var widgets = anotherUserMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(anotherUserMenu); //aggiungo il frame
};