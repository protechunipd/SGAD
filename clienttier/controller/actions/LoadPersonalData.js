/**
 * FILE: LoadPersonalData.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/LoadPersonalData.js
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-22 - Implementati metodi loadOwnedBuildings(ownedBuildingsDatas) e loadUnitInProgress = function (unitInProgressData) - Battistella Stefano
 * 2014-02-21 - Creazione della classe - Battistella Stefano
 */

/**
 * Oggetto contenente tutti i dati personali dell'utente del gioco da caricare.
 * @type {Object}
 * @private
 */
var personalDatas = {
	realUser: true,
	authenticationData: {user: "User 42", email: "stefano.battistella.92@gmail.com"},
	ownedResources: [
		{ resource: "Oro", quantity: 500},
		{ resource: "Pozioni", quantity: 500}
	],
	ownedUnits: [
		{unit: "Fante", quantity: 4},
		{unit: "Carro d'assalto", quantity: 6},
		{unit: "Cavaliere", quantity: 9},
		{unit: "Lavoratore", quantity: 2}
	],
	ownedBuildings: [
		{building: "MinieraL1", position: {x: 0, y: 0}, isFinished: 0, time: 5, storedResources: 0, unitInProgress: { }},
		{building: "MinieraL1", position: {x: 3, y: 4}, isFinished: 0, time: 5, storedResources: 0, unitInProgress: { }},
        {building: "CasermaL1", position: {x: 5, y: 5}, isFinished: 0, time: 5, storedResources: 0, unitInProgress: { }},
        {building: "CasermaL1", position: {x: 3, y: 5}, isFinished: 1, time: 5, storedResources: 0, unitInProgress: {startedTime: 3, unitPossession: {unit: "Cavaliere", quantity: 5}}},
		{building: "Torre dello stregoneL1", position: {x: 7, y: 9}, isFinished: 1, time: 5, storedResources: 0, unitInProgress: { }},
		{building: "Scuola di magiaL1", position: {x: 3, y: 11}, isFinished: 1, time: 5, storedResources: 0, unitInProgress: { }}
	] };

//Eredita da Action
LoadPersonalData.prototype = new Action();

//Costruttore della classe.
LoadPersonalData.prototype.constructor = LoadPersonalData;

/**
 * Classe per la gestione del caricamento dei dati che dipendono dai particolari dati dell'utente.
 * @implements Action
 * @constructor
 */
function LoadPersonalData() {
	/**
	 * I dati dal quale caricare il modello dei dati.
	 * @type {Object}
	 * @private
	 */
	this.datas = null;
}

/**
 * Carica i dati personali dell'utente.
 * @override
 * @return {void}
 */
LoadPersonalData.prototype.performAction = function () {
	if (this.datas === null) //controllo se i dati sono stati effettivamente impostati
		return;
	var authenticationData = null;
	var ownedResources = null;
	var ownedUnits = null;
	var userData = this.datas["userData"];
	if (this.datas["realUser"]) { //controllo se i dati da caricare sono dell'utente effettivo
		authenticationData = this.loadAuthenticationData(userData["authenticationData"]); //carico i dati dell'utente
		ownedResources = this.loadOwnedResources(userData["ownedResources"]); //carico le risorse dell'utente
		ownedUnits = this.loadOwnedUnits(userData["ownedUnits"]); //carico le unità dell'utente
	} else {
		authenticationData = new AuthenticationData('', userData["authenticationData"]["user"]);
	}
	var ownedBuildings = this.loadOwnedBuildings(userData["ownedBuildings"], this.datas["realUser"]); //carico gli edifici dell'utente

	var userDataManager = UserDataManager.getInstance();
	userDataManager.setUserData(new UserData(authenticationData, ownedBuildings, ownedResources, ownedUnits)); //imposto i dati dell'utente
	for (var key in ownedBuildings)
		ownedBuildings[key].setUserData(userDataManager.getUserData()); //imposto a quali dati gli edifici devono riferirsi

	if(this.datas["realUser"]) {
		var requestUserList = new RequestUserList();
		requestUserList.performAction();
	}
};

/**
 * Ritorna i dati di accesso dell'utente.
 * @param {Object} authenticationDataDatas I dati di accesso dell'utente.
 * @return {AuthenticationData}
 */
LoadPersonalData.prototype.loadAuthenticationData = function (authenticationDataDatas) {
	var user = authenticationDataDatas["user"]; //carico l'username dell'utente
	var email = authenticationDataDatas["email"]; //carico la mail dell'utente
	return new AuthenticationData(email, user);
};

/**
 * Carica i dati relativi alle risorse possedute dall'utente.
 * @param {Object} ownedResourcesDatas Le risorse possedute dall'utente.
 * @return {Array<OwnedResource>}
 */
LoadPersonalData.prototype.loadOwnedResources = function (ownedResourcesDatas) {
	var ownedResources = [];
	var dataFactory = DataFactory.getInstance();
	for (var i = 0; i < ownedResourcesDatas.length; i++) {
		var resource = dataFactory.getResource(ownedResourcesDatas[i]["resource"]); //ottengo il tipo di risorsa già caricato
		var quantity = ownedResourcesDatas[i]["quantity"]; //ottengo la quantità posseduta per la risorsa
		var ownedResource = new OwnedResource(quantity, resource); //creo una nuova risorsa posseduta
		ownedResources[ownedResource.getKey()] = ownedResource;
	}
	return ownedResources;
};

/**
 * Carica i dati relativi alle unità possedute dall'utente.
 * @param {Object} ownedUnitDatas Le unità possedute dall'utente.
 * @return {Array<UnitPossession>}
 */
LoadPersonalData.prototype.loadOwnedUnits = function (ownedUnitDatas) {
	var ownedUnits = [];
	var dataFactory = DataFactory.getInstance();
	for (var i = 0; i < ownedUnitDatas.length; i++) {
		var unit = dataFactory.getUnit(ownedUnitDatas[i]["unit"]); //ottengo il tipo di unità precedentemente creata
		var quantity = ownedUnitDatas[i]["quantity"]; //carico la quantità delle unità possedute dall'utente
		var ownedUnit = new UnitPossession(quantity, unit); //creo le unità possedute
		ownedUnits[ownedUnit.getKey()] = ownedUnit;
	}
	return ownedUnits;
};

/**
 * Carica i dati relativi agli edifici posseduti dall'utente.
 * @param {Object} ownedBuildingsDatas Gli edifici posseduti dall'utente.
 * @param {bool} trueUser Indica se i dati si riferiscono a questo utente o al destinatario dell'attacco.
 * @return {Array<BuildingPossession>}
 */
LoadPersonalData.prototype.loadOwnedBuildings = function (ownedBuildingsDatas, trueUser) {
	var context = Context.getInstance();
	var tiles = []; //inizialmente creo le caselle
	for (var k = 0; k < 40; k++) {
		tiles.push([]);
		for (var j = 0; j < 40; j++) {
			var tilePosition = new Position(k, j);
			var tile = new TileComponent(tilePosition); //creo una casella che occupa un posto nel mondo di gioco
			if (trueUser) { //se è l'utente giocatore allora viene permesso di interagire con tale casella
				tile.onClickAction = new CloseContextualMenu();
				tile.onRightClickAction = new ShowTileContextualMenu(tile);
			}
			tiles[k][j] = tile;
			context.addGraphicObject(tile); //aggiungo la casella al mondo di gioco
		}
	}
	var ownedBuildings = [];
	var dataFactory = DataFactory.getInstance();
	for (var i = 0; i < ownedBuildingsDatas.length; i++) {
		var building = dataFactory.getBuilding(ownedBuildingsDatas[i]["building"]); //ottengo il tipo di edificio
		var x = ownedBuildingsDatas[i]["position"]["x"]; //imposto la posizione dell'edificio
		var y = ownedBuildingsDatas[i]["position"]["y"];
		var position = new Position(x, y); //creo la posizione dell'edificio
		var isFinished = ownedBuildingsDatas[i]["isFinished"]; //carico se l'edificio è terminato o meno
		var date = new Date();
		var time = Math.floor(date.getTime() / 1000) - ownedBuildingsDatas[i]["time"]; //carico il tempo dell'ultima azione
		var storedResources = 0;
		var productedResource = building.getProductedResource();
		if (isFinished && productedResource) { //se l'edificio è terminato e se produce risorse calcolo le risorse immagazzinate
			var quantity = productedResource.getQuantity();
			var maxQuantity = productedResource.getMaxQuantity();
			var relativeTime = productedResource.getRelativeTime();
			var nTimes= Math.min(Math.floor(time / relativeTime), maxQuantity/quantity); //controllo se la capacità massima è stata raggiunta
			storedResources = nTimes * quantity; //determino le risorse immagazzinate
			time = Math.max(relativeTime - time + nTimes * relativeTime, 0); //determino il tempo residuo alla prossima produzione
		}
		var unitInProgress = null;
		if (trueUser) //se è l'utente attaccante carico anche le unità in coda
			unitInProgress = this.loadUnitInProgress(ownedBuildingsDatas[i]["unitInProgress"]); //carico le unità in coda
		var ownedBuilding = new BuildingPossession(building, isFinished, position, time, storedResources, unitInProgress);
		ownedBuildings[ownedBuilding.getKey()] = ownedBuilding;

		var buildingComponent = new BuildingComponent(ownedBuilding, ownedBuilding.getBuilding().getKey());
		if (trueUser) { //se è l'utente attaccante permetto di interagire con l'edificio
			var actionListener = new ActionListener();
			actionListener.addAction(new CloseContextualMenu());
			actionListener.addAction(new RequestHarvestResources(ownedBuilding));
			buildingComponent.onClickAction = actionListener;
			buildingComponent.onRightClickAction = new ShowBuildingContextualMenu(buildingComponent);
		} else { //altrimenti permetto un altro tipo di azione
			buildingComponent.onClickAction = new RequestStoleResources(ownedBuilding);
		}
		ownedBuilding.addObserver(buildingComponent); //imposto l'oggetto da osservare
		new VoidFilter(buildingComponent); //imposto un filtro nullo per la rappresentazione
		context.addGraphicObject(buildingComponent);
		context.removeGraphicObject(tiles[x][y]); //rimuovo la casella nella rispettiva posizione
	}
	return ownedBuildings;
};

/**
 * Carica le unità che sono in fase di creazione.
 * @param {Object} unitInProgressData Le unità che sono in fase di creazione.
 * @return {UnitInProgress}
 */
LoadPersonalData.prototype.loadUnitInProgress = function (unitInProgressData) {
	if (unitInProgressData["startedTime"] === undefined) //controllo se non ci sono unità in coda
		return null;
	var unit = DataFactory.getInstance().getUnit(unitInProgressData["unit"]); //ottengo il tipo di unità
	var quantity = unitInProgressData["quantity"]; //carico la quantità di unità in coda
	var relativeTime = unit.getCost().getRelativeTime(); //ottengo il tempo rimanente
	var date = new Date();
	var startedTime = relativeTime - date.getTime() / 1000 + unitInProgressData["startedTime"]; //imposto il tempo rimanente
	return new UnitInProgress(startedTime, unit, quantity);
};

/**
 * Imposta i dati personali dell'utente.
 * @param {Object} datas I dati personali dell'utente.
 * @return {void}
 */
LoadPersonalData.prototype.setActionDatas = function (datas) {
	this.datas = datas;
};