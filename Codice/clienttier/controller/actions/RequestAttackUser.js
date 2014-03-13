/**
 * FILE: RequestAttackUser.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestAttackUser.js
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
RequestAttackUser.prototype = new Action();

//Costruttore della classe.
RequestAttackUser.prototype.constructor = RequestAttackUser;

/**
 * Classe per la gestione della richiesta di attacco di un altro utente.
 * @implements Action
 * @constructor
 * @param {Object} user L'utente da attaccare.
 * @param {Array.<int>} quantity La quantità di unità da mandare all'attacco.
 */
function RequestAttackUser(user, quantity) {
    /**
     * L'utente da attaccare.
     * @type {Object}
     * @private
     */
    this.user = user;
    /**
     * La quantità di unità da mandare all'attacco.
     * @type {Array.<int>}
     * @private
     */
    this.quantity = quantity;
}

/**
 * Invia la richiesta di attacco dell'utente al server.
 * @override
 * @return {void}
 */
RequestAttackUser.prototype.performAction = function() {
	var request = "operation=Attack&data=user:" + this.user; //creo la richiesta per il miglioramento

	for(var unit in this.quantity)
		request += ',' + unit + ':' + this.quantity[unit];

	var showAttackResultMenu = new ShowAttackResultMenu(this.user); //creo l'azione che si occuperà di demolire l'edificio
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, showAttackResultMenu, showOperationFailureMenu, showAttackResultMenu); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};