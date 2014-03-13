/**
 * FILE: Logout.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/Logout.js
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
Logout.prototype = new Action();

//Costruttore della classe
Logout.prototype.constructor = Logout;

/**
 * Classe per la gestione del logout dell'utente.
 * @constructor
 */
function Logout() {}

/**
 * Esegue le istruzioni necessarie per effettuare il logout.
 * @override
 * @return {void}
 */
Logout.prototype.performAction = function() {
	var request = "operation=Logout&data=";

	var requester = new AJAXRequester(request, new Action(), new Action(), new Action()); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server

	setTimeout(function() {
		var path = window.location.href;
		var index = path.lastIndexOf('/');
		path = path.substr(0, index);
		window.location.replace(path);
	}, 1500);

};