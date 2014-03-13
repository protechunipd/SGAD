/**
 * FILE: DemolishBuilding.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/DemolishBuilding.js
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
DemolishBuilding.prototype = new Action();

//Costruttore della classe
DemolishBuilding.prototype.constructor = DemolishBuilding;

/**
 * Classe per la gestione della demolizione di un edificio nel villaggio dell'utente.
 * @constructor
 * @param {BuildingComponent} buildingComponent L'edificio da demolire.
 */
function DemolishBuilding(buildingComponent) {
	/**
	 * L'edificio da demolire.
	 * @type {BuildingComponent}
     * @private
	 */
	this.buildingComponent = buildingComponent;
    /**
     * Dati relativi all'edificio da demolire.
     * @type {Object}
     * @private
     */
	this.datas = null;
}

/**
 * Demolisce l'edificio indicato.
 * @override
 * @return {void}
 */
DemolishBuilding.prototype.performAction = function() {
	if(!this.datas) {
		var operationFailureMenu = new ShowOperationFailureMenu();
		operationFailureMenu.performAction();
		return;
	}

	var building = this.buildingComponent.getBuildingPossession();

	var userData = UserDataManager.getInstance().getUserData();
	var cost = building.getBuilding().getCost();
	var quantityResources = cost.getQuantityResource();
	for(var i = 0; i < quantityResources.length; i++)
	{
		var key = quantityResources[i].getResource().getKey();
		var ownedResource = userData.getOwnedResource(key);
		ownedResource.setQuantity(ownedResource.getQuantity() + quantityResources[i].getQuantity() / 2);
	}

	var tile = new TileComponent(building.getPosition());
	tile.onRightClickAction = new ShowTileContextualMenu(tile);
	Context.getInstance().addGraphicObject(tile);
	userData.deleteBuildingPossession(building.getKey());

	var removeGraphicObject = new RemoveGraphicObjectAction(this.buildingComponent);
	removeGraphicObject.performAction();

    //Aggiorno totalUnitSpaces
    userData.initializeTotalUnitSpaces();
};
/**
 * Imposta i dati relativi all'edificio da demolire.
 * @param {Object} datas I dati da impostare.
 * @return {void}
 */
DemolishBuilding.prototype.setActionDatas = function(datas) {
	this.datas = datas;
};