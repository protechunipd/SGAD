/**
 * FILE: HarvestResources.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/HarvestResources.js
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
HarvestResources.prototype = new Action();

//Costruttore della classe
HarvestResources.prototype.constructor = HarvestResources;

/**
 * Classe per la gestione della raccolta di risorse dagli edifici di produzione costruiti nel villaggio.
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio da cui raccogliere risorse.
 */
function HarvestResources(buildingPossession) {
	/**
	 * L'edificio da cui raccogliere risorse.
	 * @type {BuildingPossession}
	 * @private
	 */
	this.buildingPossession = buildingPossession;
	/**
	 * I dati relativi alle risorse da raccogliere.
	 * @type {Object}
	 * @private
	 */
	this.datas = null;
}

/**
 * Esegue le istruzioni necessarie per raccogliere le risorse.
 * @override
 * @return {void}
 */
HarvestResources.prototype.performAction = function() {
	if(!this.datas || !this.datas["result"]) {
		var operationFailureMenu = new ShowOperationFailureMenu();
		operationFailureMenu.performAction();
		return;
	}

	var resources = this.datas["quantity"];
	if(!resources)
		return;
	var building = this.buildingPossession.getBuilding();
	var productedResources = building.getProductedResource();
	var key = productedResources.getResource().getKey();
	var userData = UserDataManager.getInstance().getUserData();
	var ownedResources = userData.getOwnedResource(key);
	ownedResources.setQuantity(ownedResources.getQuantity() + resources);
	this.buildingPossession.setStoredResources(0);
};
/**
 * Imposta i dati relativi alle risorse da raccogliere.
 * @param {Object} datas I dati da impostare.
 * @return {void}
 */
HarvestResources.prototype.setActionDatas = function(datas) {
	this.datas = datas;
};
