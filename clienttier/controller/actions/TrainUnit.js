/**
 * FILE: TrainUnit.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/TrainUnit.js
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
TrainUnit.prototype = new Action();

//Costruttore della classe.
TrainUnit.prototype.constructor = TrainUnit;

/**
 * Classe per l'aggiunta di nuove unità ad un edificio.
 * @implements Action
 * @constructor
 * @param {Unit} unit Il tipo di unità da aggiungere.
 * @param {int} quantity La quantità di unità da aggiungere.
 * @param {BuildingPossession} building L'edificio a cui aggiungere le unità.
 */
function TrainUnit(unit, quantity, building) {
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
    /**
     * L'edificio a cui aggiungere le unità.
     * @type {BuildingPossession}
     * @private
     */
    this.building = building;
    /**
     * I dati da impostare.
     * @type {Object}
     * @private
     */
	this.datas = null;
}

/**
 * Aggiunge le unità richieste.
 * @override
 * @return {void}
 */
TrainUnit.prototype.performAction = function () {
	if (this.datas === null) {
		var operationFailureMenu = new ShowOperationFailureMenu();
		operationFailureMenu.performAction();
		return;
	}
	if(!this.datas) {
		var menu = (new NotifyMenuFactory("Attenzione! Non c'è sufficiente spazio per ospitare le tue unità. Ci sono altre unità in coda!", null)).buildMenu();
		var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
		var context = Context.getInstance();
		for (var j = 0; j < widgets.length; j++)
			context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
		context.addGraphicObject(menu); //aggiungo il frame
		return;
	}
	var unitInProgress = this.building.getUnitInProgress();
	var cost = this.unit.getCost();
	if (!unitInProgress) {
		unitInProgress = new UnitInProgress(cost.getRelativeTime(), this.unit, 0);
		this.building.setUnitInProgress(unitInProgress);
	}
	var userData = UserDataManager.getInstance().getUserData();
	var quantityResources = cost.getQuantityResource();
	for (var i = 0; i < quantityResources.length; i++) {
		var ownedResource = userData.getOwnedResource(quantityResources[i].getResource().getKey());
		ownedResource.setQuantity(ownedResource.getQuantity() - quantityResources[i].getQuantity() * this.quantity);
	}
	unitInProgress.setQuantity(unitInProgress.getState() + this.quantity);
	//TODO
	// var ownedUnits = userData.getOwnedUnits()[this.unit.getKey()];
	// ownedUnits.setQuantity(ownedUnits.getQuantity() + this.quantity);

};
/**
 * Imposta i dati necessari.
 * @param {Object} datas I dati da impostare.
 * @return {void}
 */
TrainUnit.prototype.setActionDatas = function(datas){
    this.datas = datas;
};
