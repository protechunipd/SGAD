/**
 * FILE: RequestUserList.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestUserList.js
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
RequestUserList.prototype = new Action();

//Costruttore della classe.
RequestUserList.prototype.constructor = RequestUserList;

/**
 * Classe per la richiesta della lista di utenti presenti
 * @implements Action
 * @constructor
 */
function RequestUserList() {
}

/**
 *
 * @override
 * @return {void}
 */
RequestUserList.prototype.performAction = function() {
	var request = "operation=LoadUserList&data="; //creo la richiesta per il miglioramento

	var showUserList = new ShowUserListMenu(); //creo l'azione che si occuperà di costruire l'edificio
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, showUserList, showOperationFailureMenu, showUserList); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};