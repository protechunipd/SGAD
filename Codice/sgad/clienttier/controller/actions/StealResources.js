/**
 * FILE: StealResources.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/StoleResources.js
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
StealResources.prototype = new Action();

//Costruttore della classe.
StealResources.prototype.constructor = StealResources;

/**
 * Classe per la gestione del saccheggio di un edificio produttivo di un altro utente.
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio da cui saccheggiare le risorse.
 */
function StealResources(buildingPossession) {
    /**
     * L'edificio da cui saccheggiare le risorse.
     * @type {BuildingPossession}
     * @private
     */
    this.buildingPossession = buildingPossession;
    /**
     * I dati relativi al saccheggio delle risorse.
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
StealResources.prototype.performAction = function() {
	if(this.datas === null) {
		var operationFailureMenu = new ShowOperationFailureMenu();
		operationFailureMenu.performAction();
		return;
	}
	var menu;
	var widgets;
	var context = Context.getInstance();
	var quantity = this.datas["quantity"];
	var oldUserData = BackupManager.getInstance().getUserDataBackup();
	var building = this.buildingPossession.getBuilding();
	var key = building.getProductedResource().getResource().getKey();

	if(!this.datas)
		menu = (new NotifyMenuFactory("Attenzione! Probabilmente le risorse sono state già raccolte oppure hai già saccheggiato", null)).buildMenu();
	else {
		this.buildingPossession.setStoredResources(0);
		var ownedResource = oldUserData.getOwnedResource(key);
		ownedResource.setQuantity(ownedResource.getQuantity() + quantity);
		menu = (new NotifyMenuFactory("Complimenti! Hai rubato " + quantity + " " + key + " all'utente.", null)).buildMenu();
	}

	widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
	for (var j = 0; j < widgets.length; j++)
		context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
	context.addGraphicObject(menu); //aggiungo il frame
};

/**
 * Imposta i dati necessari.
 * @param {Object} datas I dati da impostare.
 * @return {void}
 */
StealResources.prototype.setActionDatas = function(datas) {
	this.datas = datas;
};