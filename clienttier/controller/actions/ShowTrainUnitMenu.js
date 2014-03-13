/**
 * FILE: UnitSelectionMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowTrainUnitMenu.js
 * DATA CREAZIONE: 22 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-22 - Creazione della classe - Battistella Stefano
 * 2014-02-22 - Implementato metodo performAction() - Battistella Stefano
 */

//Eredita da Action
ShowTrainUnitMenu.prototype = new Action();

//Costruttore della classe.
ShowTrainUnitMenu.prototype.constructor = ShowTrainUnitMenu;

/**
 * Classe per la gestione della visualizzazione di un menu che permette all'utente di addestrare le unità.
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio di cui richiedere l'addestramento delle unità.
 * @param {Unit} unit Il tipo di unità da addestrare.
 */
function ShowTrainUnitMenu(buildingPossession, unit) {
	/**
	 * L'edificio di cui richiedere l'addestramento delle unità.
	 * @type {BuildingPossession}
     * @private
	 */
	this.buildingPossession = buildingPossession;
	/**
	 * Il tipo di unità da addestrare.
	 * @type {Unit}
     * @private
	 */
	this.unit = unit;
}

/**
 * Visualizza il menu per richiedere la quantità da inserire e la conferma dell'addestramento.
 * @override
 * @return {void}
 */
ShowTrainUnitMenu.prototype.performAction = function() {
	var quantity = parseInt(prompt("Inserisci la quatità da addestrare", "0"));

	var quantityResources = this.unit.getCost().getQuantityResource();
	var userData = UserDataManager.getInstance().getUserData();
	var possibleTrain = true;
	for(var i = 0; i < quantityResources.length && possibleTrain; i++) {
		var key = quantityResources[i].getResource().getKey();
		var ownedResource = userData.getOwnedResource(key);
		if(ownedResource.getQuantity() < quantityResources[i].getQuantity() * quantity)
			possibleTrain = false;
	}

	var menu;

	if(!possibleTrain)
		menu = (new NotifyMenuFactory("La quantità inserita non è valida. Non hai sufficienti risorse.", new EnableRightClick())).buildMenu();
	else if(quantity < 0)
		menu = (new NotifyMenuFactory("La quantità inserita non è valida. Deve essere positiva.", new EnableRightClick())).buildMenu();
	else
		menu = (new ConfirmMenuFactory(new RequestTrainUnits(this.buildingPossession, this.unit, quantity), new CloseContextualMenu())).buildMenu();

	var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var j = 0; j < widgets.length; j++) {
		context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(menu); //aggiungo il frame
};