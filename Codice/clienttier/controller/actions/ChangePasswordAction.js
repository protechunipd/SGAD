/**
 * FILE: ChangePasswordAction.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ChangePasswordAction.js
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
ChangePasswordAction.prototype = new Action();
 
//Costruttore della classe
ChangePasswordAction.prototype.constructor = ChangePasswordAction;

/**
 * Classe per permettere di modificare la password di un account.
 * @implements Action
 * @constructor
 */
function ChangePasswordAction() {
}

/**
 * Esegue la lista di azioni necessarie per la modifica della password.
 * @override
 * @return {void}
 */
ChangePasswordAction.prototype.performAction = function () {
	var oldPassword = prompt("Inserisci la vecchia password");
	var newPassword = prompt("Inserisci la nuova password");
	var confirmNewPassword = prompt("Reinserisci la nuova password");

	var menu;

	if(newPassword !== confirmNewPassword)
		menu = (new NotifyMenuFactory("Attenzione! Le password non corrispondono.", null)).buildMenu();
	else
		menu = (new ConfirmMenuFactory(new RequestChangePassword(oldPassword, newPassword, confirmNewPassword), null)).buildMenu();

	var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var j = 0; j < widgets.length; j++) {
		context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(menu); //aggiungo il frame
};