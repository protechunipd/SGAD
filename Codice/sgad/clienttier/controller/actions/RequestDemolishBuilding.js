/**
 * FILE: RequestDemolishBuilding.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestDemolishBuilding.js
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-21 - Creazione della classe - Gatto Francesco
 */

//Eredita da Action
RequestDemolishBuilding.prototype = new Action();

//Costruttore della classe.
RequestDemolishBuilding.prototype.constructor = RequestDemolishBuilding;

/**
 * Classe per la richiesta di demolizione di un edificio.
 * @implements Action
 * @constructor
 * @param {BuildingComponent} buildingComponent L'edificio da demolire.
 */
function RequestDemolishBuilding(buildingComponent) {
    /**
     * L'edificio da demolire.
     * @type {BuildingComponent}
     * @private
     */
    this.buildingComponent = buildingComponent;
}

/**
 * Gestisce la richiesta di demolizione dell'edificio.
 * @override
 * @return {void}
 */
RequestDemolishBuilding.prototype.performAction = function() {
	var key = this.buildingComponent.getBuildingPossession().getKey();
	var request = "operation=DemolishBuilding&data=key:" + key; //creo la richiesta per il miglioramento

	var demolishBuilding = new DemolishBuilding(this.buildingComponent); //creo l'azione che si occuperà di demolire l'edificio
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, demolishBuilding, showOperationFailureMenu, demolishBuilding); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};