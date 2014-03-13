/**
 * FILE: RequestHarvestResources.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestHarvestResources.js
 * DATA CREAZIONE: 22 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-22 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
RequestHarvestResources.prototype = new Action();

//Costruttore della classe.
RequestHarvestResources.prototype.constructor = RequestHarvestResources;

/**
 * Classe per la richiesta di raccolta di risorse.
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio da cui raccogliere.
 */
function RequestHarvestResources(buildingPossession) {
    /**
     * L'edificio da demolire.
     * @type {BuildingPossession}
     * @private
     */
    this.buildingPossession = buildingPossession;
}

/**
 * Gestisce la richiesta di demolizione dell'edificio.
 * @override
 * @return {void}
 */
RequestHarvestResources.prototype.performAction = function() {
	var productedResources = this.buildingPossession.getBuilding().getProductedResource();
	var storedResources = this.buildingPossession.getStoredResources();
	if(!productedResources || storedResources === 0)
		return;

	var key = this.buildingPossession.getKey();
	var request = "operation=HarvestResource&data=key:" + key; //creo la richiesta per la raccolta

	var harvestResource = new HarvestResources(this.buildingPossession); //creo l'azione che si occuperà di raccogliere le risorse
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, harvestResource, showOperationFailureMenu, harvestResource); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};