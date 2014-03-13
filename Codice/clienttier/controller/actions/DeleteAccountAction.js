/**
 * FILE: DeleteAccountAction.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/DeleteAccountAction.js
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
DeleteAccountAction.prototype = new Action();

//Costruttore della classe
DeleteAccountAction.prototype.constructor = DeleteAccountAction;

/**
 * La classe viene utilizzata per l'eliminazione di un account utente.
 * @implements Action
 * @constructor
 */
function DeleteAccountAction() {
}

/**
 * Esegue la lista di azioni per eliminare l'account.
 * @override
 * @return {void}
 */
DeleteAccountAction.prototype.performAction = function () {
	var menu = (new ConfirmMenuFactory(new RequestDeleteAccount(), null)).buildMenu();

	var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var j = 0; j < widgets.length; j++) {
		context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(menu); //aggiungo il frame
};