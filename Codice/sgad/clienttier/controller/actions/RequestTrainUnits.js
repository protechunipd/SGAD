/**
 * FILE: RequestTrainUnits.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestTrainUnits.js
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
RequestTrainUnits.prototype = new Action();

//Costruttore della classe.
RequestTrainUnits.prototype.constructor = RequestTrainUnits;

/**
 * Classe per la richiesta di creazione di nuove unità.
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio a cui aggiungere le unità.
 * @param {Unit} unit Il tipo di unità da aggiungere.
 * @param {int} quantity La quantità di unità da aggiungere.
 */
function RequestTrainUnits(buildingPossession, unit, quantity) {
    /**
     * L'edificio a cui aggiungere le unità.
     * @type {BuildingPossession}
     * @private
     */
    this.buildingPossession = buildingPossession;
    /**
     * Il tipo di unità da aggiungere.
     * @type {Unit}
     * @private
     */
    this.unit = unit;
    /**
     * La quantità di unità da aggiungere.
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
RequestTrainUnits.prototype.performAction = function() {
	var request = "operation=TrainUnit&data=unit:" + this.unit.getKey() + ",quantity:" + this.quantity + ",key:" + this.buildingPossession.getKey(); //creo la richiesta per il miglioramento

	var trainUnits = new TrainUnit(this.unit, this.quantity, this.buildingPossession); //creo l'azione che si occuperà di demolire l'edificio
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, trainUnits, showOperationFailureMenu, trainUnits); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};