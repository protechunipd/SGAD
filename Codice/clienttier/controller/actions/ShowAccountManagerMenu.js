/**
 * FILE: ShowAccountManagerMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowAccountManagerMenu.js
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ShowAccountManagerMenu.prototype = new Action();

//Costruttore della classe.
ShowAccountManagerMenu.prototype.constructor = ShowAccountManagerMenu;

/**
 * Classe per la creazione di un menu per la gestione dell'account.
 * @implements Action
 * @constructor
 */
function ShowAccountManagerMenu() {
}

/**
 * Visualizza il menu relativo all'account.
 * @override
 * @return {void}
 */
ShowAccountManagerMenu.prototype.performAction = function () {
	var contextualMenu = (new AccountManagerMenuFactory()).buildMenu(); //costruisco il menu contestuale

	var closeContextualMenu = new CloseContextualMenu(); //chiudo il menu contestuale già visualizzato
	closeContextualMenu.performAction();

	var widgets = contextualMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.setContextualMenu(contextualMenu);
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(contextualMenu); //aggiungo il frame
};