/**
 * FILE: RequestDeleteAccount.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestDeleteAccount.js
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
RequestDeleteAccount.prototype = new Action();

//Costruttore della classe.
RequestDeleteAccount.prototype.constructor = RequestDeleteAccount;

/**
 * Classe per la gestione della richiesta di eliminazione dell'account.
 * @implements Action
 * @constructor
 */
function RequestDeleteAccount() {
}

/**
 * Invia la richiesta di di eliminazione dell'account.
 * @override
 * @return {void}
 */
RequestDeleteAccount.prototype.performAction = function() {
	var request = "operation=DeleteAccount&data="; //creo la richiesta per la password

	var showAccountDeleted = new ShowAccountDeletedMenu();
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, showAccountDeleted, showOperationFailureMenu, showAccountDeleted); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};