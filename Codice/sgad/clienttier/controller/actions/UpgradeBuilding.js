/**
 * FILE: UpgradeBuilding.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/UpgradeBuilding.js
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
UpgradeBuilding.prototype = new Action();

//Costruttore della classe.
UpgradeBuilding.prototype.constructor = UpgradeBuilding;

/**
 * Classe per miglioramento di un edificio.
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio da migliorare.
 */
function UpgradeBuilding(buildingPossession) {
	/**
	 * L'edificio da migliorare.
	 * @type {BuildingPossession}
	 * @private
	 */
	this.buildingPossession = buildingPossession;
	/**
	 * I dati per il miglioramento.
	 * @type {Object}
	 * @private
	 */
	this.datas = null;
}

/**
 * Migliora l'edificio indicato.
 * @override
 * @return {void}
 */
UpgradeBuilding.prototype.performAction = function () {
	if (this.datas === null) {
		var operationFailureMenu = new ShowOperationFailureMenu();
		operationFailureMenu.performAction();
		return;
	}
	if(!this.datas) {
		var menu = (new NotifyMenuFactory("Attenzione! I requisiti richiesti non sono soddisfatti oppure non hai sufficienti lavoratori.", null)).buildMenu();
		var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
		var context = Context.getInstance();
		for (var j = 0; j < widgets.length; j++) {
			context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
		}
		context.addGraphicObject(menu); //aggiungo il frame
		return;
	}

	var building = this.buildingPossession;

	var userData = UserDataManager.getInstance().getUserData();
	var dataFactory = DataFactory.getInstance();
	var nextLevelKey = building.getBuilding().getNextLevelKey();
	building.building = dataFactory.getBuilding(nextLevelKey);
	var cost = building.getBuilding().getCost();
	building.time = cost.getRelativeTime();
	building.isFinished = false;
	building.setStoredResources(0);

	var quantityResources = cost.getQuantityResource();
	for (var i = 0; i < quantityResources.length; i++) {
		var key = quantityResources[i].getResource().getKey();
		var ownedResource = userData.getOwnedResource(key);
		ownedResource.setQuantity(ownedResource.getQuantity() - quantityResources[i].getQuantity());
	}
};

/**
 * Imposta i dati per il miglioramento dell'edificio.
 * @param datas I dati per il miglioramento.
 * @return {void}
 */
UpgradeBuilding.prototype.setActionDatas = function (datas) {
	this.datas = datas;
};