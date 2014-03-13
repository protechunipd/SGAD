/**
 * FILE: BuildConstruction.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/BuildConstruction.js
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
BuildConstruction.prototype = new Action();

//Costruttore della classe
BuildConstruction.prototype.constructor = BuildConstruction;

/**
 * Classe per la gestione della costruzione di un nuovo edificio nel villaggio dell'utente.
 * @implements Action
 * @constructor
 * @param {TileComponent} tileComponent La casella della mappa dove costruire l'edificio.
 * @param {string} key Tipo di edificio da rappresentare.
 */
function BuildConstruction(tileComponent, key) {
    /**
     * tileComponent La casella della mappa dove costruire l'edificio.
     * @type {TileComponent}
     * @private
     */
    this.tileComponent = tileComponent;
    /**
     * Tipo di edificio da rappresentare.
     * @type {string}
     * @private
     */
    this.key = key;
    /**
     * Dati relativi all'edificio da costruire.
     * @type {Object}
     * @private
     */
    this.datas = null;
}

/**
 * Esegue la lista di azioni necessaria per costruire il nuovo edificio.
 * @override
 * @return {void}
 */
BuildConstruction.prototype.performAction = function() {
	if(this.datas === null) { //controllo se l'operazione è fallita
		var operationFailureMenu = new ShowOperationFailureMenu(); //visualizzo il fallimento dell'operazione
		operationFailureMenu.performAction();
		return;
	}
	var context = Context.getInstance();
	if(!this.datas) {
		var menu = (new NotifyMenuFactory("Attenzione! Non hai sufficienti lavoratori!.", null)).buildMenu();
		var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
		for (var j = 0; j < widgets.length; j++)
			context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
		context.addGraphicObject(menu); //aggiungo il frame
		return;
	}

	//l'operazione è andata a buon fine
	context.removeGraphicObject(this.tileComponent); //rimuovo la casella dove deve essere costruito l'edificio

	var userData = UserDataManager.getInstance().getUserData();
	var dataFactory = DataFactory.getInstance();
	var building = dataFactory.getBuilding(this.key);//ottengo il tipo di costruzione a cui associare l'edificio

	var cost = building.getCost();//sottraggo i costi della costruzione
	var quantityResources = cost.getQuantityResource();
	for(var i = 0; i < quantityResources.length; i++)
	{
		var key = quantityResources[i].getResource().getKey();
		var ownedResource = userData.getOwnedResource(key);
		ownedResource.setQuantity(ownedResource.getQuantity() - quantityResources[i].getQuantity());
	}

	var position = this.tileComponent.getPosition(); //ottengo la posizione in cui piazzare l'edificio
	var time = building.getCost().getRelativeTime(); //ottengo il tempo necessario a costruire l'edificio
	var buildingPossession = new BuildingPossession(building, false, position, time, 0, null); //creo l'edificio del modello
    buildingPossession.setUserData(userData);
	var buildingComponent = new BuildingComponent(buildingPossession, this.key); //creo l'edificio da visualizzare
	buildingComponent.onClickAction = new RequestHarvestResources(buildingPossession);
	buildingComponent.onRightClickAction = new ShowBuildingContextualMenu(buildingComponent);
	buildingPossession.addObserver(buildingComponent);
	var setAllVoidFilter = new SetAllVoidFilter(); //imposto che il filtro una volta costruito sia quello nullo
	userData.addBuildingPossession(buildingPossession);
	setAllVoidFilter.performAction();
	new VoidFilter(buildingComponent);
	context.addGraphicObject(buildingComponent); //aggiungo l'oggetto grafico
};

/**
 * Imposta i dati relativi all'edificio da costruire.
 * @param {Object} datas I dati da impostare.
 * @return {void}
 */
BuildConstruction.prototype.setActionDatas = function(datas) {
	this.datas = datas;
};