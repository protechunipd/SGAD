/**
 * FILE: ReloadPageAction.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ReloadPageAction.js
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ReloadPageAction.prototype = new Action();

//Costruttore della classe.
ReloadPageAction.prototype.constructor = ReloadPageAction;

/**
 * Azione per il ricaricamento della pagina.
 * @implements Action
 * @constructor
 */
function ReloadPageAction() {

}

/**
 * Ricarica la pagina.
 * @override
 * @return {void}
 */
ReloadPageAction.prototype.performAction = function() {
	location.reload(true); //richiesta di caricamento della pagina
};