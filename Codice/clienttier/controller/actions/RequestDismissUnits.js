/**
 * FILE: RequestDismissUnits.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestDismissUnits.js
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
RequestDismissUnits.prototype = new Action();

//Costruttore della classe.
RequestDismissUnits.prototype.constructor = RequestDismissUnits;

/**
 * Classe per la richiesta di dimissione di unità possedute.
 * @implements Action
 * @constructor
 * @param {UnitPossession} unit Il tipo di unità da aggiungere.
 * @param {int} quantity La quantità di unità da aggiungere.
 */
function RequestDismissUnits(unit, quantity) {
    /**
     * Il tipo di unità da dimettere.
     * @type {Unit}
     * @private
     */
    this.unit = unit;
    /**
     * La quantità di unità da dimettere.
     * @type {int}
     * @private
     */
    this.quantity = quantity;
}

/**
 * Invia la richiesta di caricamento dei dati al server.
 * @override
 * @return {void}
 */
RequestDismissUnits.prototype.performAction = function() {
	var request = "operation=DismissUnit&data=type:" + this.unit.getKey() + ",quantity:" + this.quantity; //creo la richiesta per il miglioramento

	var dismissUnits = new DismissUnits(this.unit, this.quantity); //creo l'azione che si occuperà di demolire l'edificio
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, dismissUnits, showOperationFailureMenu, dismissUnits); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};