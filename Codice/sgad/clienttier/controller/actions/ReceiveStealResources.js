/**
 * FILE: ReceiveStealResources.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ReceiveStealResources.js
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
ReceiveStealResources.prototype = new Action();

//Costruttore della classe.
ReceiveStealResources.prototype.constructor = ReceiveStealResources;

/**
 * Classe per la ricezione delle risorse rubate
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio da cui saccheggiare le risorse.
 */
function ReceiveStealResources(buildingPossession) {
    /**
     * L'edificio da cui saccheggiare le risorse.
     * @type {BuildingPossession}
     * @private
     */
    this.buildingPossession = buildingPossession;
    /**
     * I dati relativi all'edificio da cui saccheggiare.
     * @type {Object}
     * @private
     */
	this.datas = null;
}

/**
 * Si occupa di attuare il saccheggio.
 * @override
 * @return {void}
 */
ReceiveStealResources.prototype.performAction = function() {
	if(this.datas === null) {
		var operationFailureMenu = new ShowOperationFailureMenu();
		operationFailureMenu.performAction();
		return;
	}
	if(!this.datas) {
		var menu = (new NotifyMenuFactory("Attenzione! Probabilmente le risorse sono state già raccolte", null)).buildMenu();
		var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
		var context = Context.getInstance();
		for (var j = 0; j < widgets.length; j++)
			context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
		context.addGraphicObject(menu); //aggiungo il frame
		return;
	}
	var oldUserData = BackupManager.getInstance().getUserDataBackup();
	var building = this.buildingPossession.getBuilding();
	var key = building.getProductedResource().getResource().getKey();
	var quantity = this.datas["quantity"];
	var ownedResource = oldUserData.getOwnedResource(key);
	ownedResource.setQuantity(ownedResource.getQuantity() + quantity);
};

/**
 * Imposta i dati necessari.
 * @param {Object} datas I dati da impostare.
 * @return {void}
 */
ReceiveStealResources.prototype.setActionDatas = function(datas) {
	this.datas = datas;
};