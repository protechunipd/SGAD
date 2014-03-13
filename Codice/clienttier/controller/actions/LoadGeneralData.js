/**
 * FILE: LoadGeneralData.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/LoadGeneralData.js
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-22 - Implementati metodi loadBuildings(buildingsDatas), loadProductedResources(productedResourcesDatas),
 * loadProductedUnits(productedUnitsDatas) e loadBonus(bonusDatas) - Battistella Stefano
 * 2014-02-21 - Creazione della classe - Battistella Stefano
 */

/**
 * Oggetto contenente tutti i dati generali del gioco da caricare.
 * @type {Object}
 * @private
 **/
var generalDatas = {
	resources: [
		{ resourceName: "Oro" },
		{ resourceName: "Pozioni" }
	],

	units: [
		{ name: "Fante", attack: 6, defence: 15, cost: { relativeTime: 2, quantityResource: [
			{ resource: "Oro", quantity: 2 },
			{ resource: "Pozioni", quantity: 3 }
		] } },
		{ name: "Cavaliere", attack: 18, defence: 12, cost: { relativeTime: 2, quantityResource: [
			{ resource: "Oro", quantity: 5 },
			{ resource: "Pozioni", quantity: 15 }
		] } },
		{ name: "Carro d'assalto", attack: 45, defence: 40, cost: { relativeTime: 2, quantityResource: [
			{ resource: "Oro", quantity: 40 },
			{ resource: "Pozioni", quantity: 40 }
		] } },
		{ name: "Lavoratore", attack: 0, defence: 0, cost: { relativeTime: 0, quantityResource: [
			{ resource: "Oro", quantity: 0 },
			{ resource: "Pozioni", quantity: 0 }
		] } }
	],

	buildings: [
		{ nameBuilding: "Miniera", level: 1, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 50 },
			{ resource: "Pozioni", quantity: 0 }
		] },
			precondition: [ ], unitsSpace: 0, productedResource: { resource: "Oro", relativeTime: 5, quantity: 10, maxQuantity: 100 },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 1, isDestructible: 1},

		{ nameBuilding: "Miniera", level: 2, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 300 },
			{ resource: "Pozioni", quantity: 0 }
		] },
			precondition: ["Torre dello stregoneL2"], unitsSpace: 0, productedResource: { resource: "Oro", relativeTime: 5, quantity: 20, maxQuantity: 200 },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0, isDestructible: 1},

		{ nameBuilding: "Miniera", level: 3, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 800 },
			{ resource: "Pozioni", quantity: 0 }
		] },
			precondition: ["Torre dello stregoneL3"], unitsSpace: 0, productedResource: { resource: "Oro", relativeTime: 5, quantity: 40, maxQuantity: 400 },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0, isDestructible: 1},

		{ nameBuilding: "Scuola di magia", level: 1, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 100 },
			{ resource: "Pozioni", quantity: 10 }
		] },
			precondition: [ ], unitsSpace: 0, productedResource: { resource: "Pozioni", relativeTime: 5, quantity: 10, maxQuantity: 100 },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 1, isDestructible: 1},

		{ nameBuilding: "Scuola di magia", level: 2, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 300 },
			{ resource: "Pozioni", quantity: 20 }
		] },
			precondition: ["Torre dello stregoneL2"], unitsSpace: 0, productedResource: { resource: "Pozioni", relativeTime: 5, quantity: 15, maxQuantity: 150 },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0, isDestructible: 1},

		{ nameBuilding: "Scuola di magia", level: 3, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 500 },
			{ resource: "Pozioni", quantity: 30 }
		] },
			precondition: ["Torre dello stregoneL3"], unitsSpace: 0, productedResource: { resource: "Pozioni", relativeTime: 5, quantity: 25, maxQuantity: 200 },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0, isDestructible: 1},

		{ nameBuilding: "Stalla", level: 1, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 200 },
			{ resource: "Pozioni", quantity: 50 }
		] },
			precondition: [ ], unitsSpace: 15, productedResource: { },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 1, isDestructible: 1},

		{ nameBuilding: "Stalla", level: 2, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 200 },
			{ resource: "Pozioni", quantity: 50 }
		] },
			precondition: ["Torre dello stregoneL2"], unitsSpace: 30, productedResource: { },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0, isDestructible: 1},

		{ nameBuilding: "Stalla", level: 3, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 400 },
			{ resource: "Pozioni", quantity: 100 }
		] },
			precondition: ["Torre dello stregoneL3"], unitsSpace: 50, productedResource: { },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0, isDestructible: 1},

		{ nameBuilding: "Caserma", level: 1, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 100 },
			{ resource: "Pozioni", quantity: 100 }
		] },
			precondition: [ ], unitsSpace: 15, productedResource: { },
			productedUnits: ["Fante", "Cavaliere", "Carro d'assalto"], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 1, isDestructible: 1},

		{ nameBuilding: "Caserma", level: 2, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 150 },
			{ resource: "Pozioni", quantity: 150 }
		] },
			precondition: ["Torre dello stregoneL2", "StallaL2"], unitsSpace: 25, productedResource: { },
			productedUnits: ["Fante", "Cavaliere", "Carro d'assalto"], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 0.9 }, isConstructible: 0, isDestructible: 1},

		{ nameBuilding: "Caserma", level: 3, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 200 },
			{ resource: "Pozioni", quantity: 200 }
		] },
			precondition: ["Torre dello stregoneL3", "StallaL2"], unitsSpace: 50, productedResource: { },
			productedUnits: ["Fante", "Cavaliere", "Carro d'assalto"], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 0.8 }, isConstructible: 0, isDestructible: 1},

		{ nameBuilding: "Torre dello stregone", level: 1, cost: { relativeTime: 0, quantityResource: [
			{ resource: "Oro", quantity: 0 },
			{ resource: "Pozioni", quantity: 0 }
		] },
			precondition: [ ], unitsSpace: 0, productedResource: { },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0, isDestructible: 0},

		{ nameBuilding: "Torre dello stregone", level: 2, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 400 },
			{ resource: "Pozioni", quantity: 400 }
		] },
			precondition: [ ], unitsSpace: 0, productedResource: { },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0, isDestructible: 0},

		{ nameBuilding: "Torre dello stregone", level: 3, cost: { relativeTime: 5, quantityResource: [
			{ resource: "Oro", quantity: 800 },
			{ resource: "Pozioni", quantity: 300 }
		] },
			precondition: [ ], unitsSpace: 0, productedResource: { },
			productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0, isDestructible: 0}
	]
};

//Eredita da Action
LoadGeneralData.prototype = new Action();

//Costruttore della classe.
LoadGeneralData.prototype.constructor = LoadGeneralData;

/**
 * Classe per la gestione del caricamento dei dati che non dipendono dai particolari dati dell'utente.
 * @implements Action
 * @constructor
 */
function LoadGeneralData() {
	/**
	 * I dati dal quale caricare il modello dei dati.
	 * @type {Object}
     * @private
	 */
	this.datas = null;
}

/**
 * Carica il modello dei dati in base all'oggetto contenente i dati memorizzato.
 * @override
 * @return {void}
 */
LoadGeneralData.prototype.performAction = function () {
	var datas = this.datas;
	if (datas === null) //se non sono stati caricati dei dati allora il modello non viene caricato
		return;

	var dataFactory = DataFactory.getInstance();
	var resources = this.loadResources(datas["resources"]); //carico le risorse
	dataFactory.setResources(resources); //imposto le risorse caricate
	var units = this.loadUnits(datas["units"]); //carico le unità
	dataFactory.setUnits(units); //imposto le unità caricate
	var buildings = this.loadBuildings(datas["buildings"]); //carico gli edifici
	dataFactory.setBuildings(buildings); //imposto gli edifici caricati
	var requestLoadPersonalData = new RequestLoadPersonalData(); //creo l'azione che si occuperà di caricare i dati personali
	requestLoadPersonalData.performAction();
};

/**
 * Carica le risorse indicate dal frammento dei dati.
 * @param {Object} resourcesDatas I dati contenenti le risorse.
 * @return {Array.<Resource>} Le risorse caricate.
 */
LoadGeneralData.prototype.loadResources = function (resourcesDatas) {
	var resources = [];
	for (var i = 0; i < resourcesDatas.length; i++) {
		var resource = new Resource(resourcesDatas[i]["resourceName"]); //creo una nuova risorsa per la risorsa individuata
		resources[resource.getKey()] = resource; //imposto come chiave associativa la chiave della risorsa
	}
	return resources;
};

/**
 * Carica le unità indicate nel frammento dei dati.
 * @param {Object} unitsDatas I dati contenenti le unità.
 * @return {Array.<Unit>} Le unità caricate
 */
LoadGeneralData.prototype.loadUnits = function (unitsDatas) {
	var units = [];
	for (var i = 0; i < unitsDatas.length; i++) {
		var cost = this.loadCost(unitsDatas[i]["cost"]); //carico i costi di addestramento delle unità
		var unit = new Unit(unitsDatas[i]["name"], unitsDatas[i]["attack"], unitsDatas[i]["defence"], cost); //creo una nuova unità per l'unità individuata
		units[unit.getKey()] = unit;
	}
	return units;
};

/**
 * Carica il costo indicato nel frammento dei dati.
 * @param {Object} costData I dati contenenti il costo.
 * @return {Cost} Il costo caricato.
 */
LoadGeneralData.prototype.loadCost = function (costData) {
	var quantityResources = this.loadQuantityResource(costData["quantityResource"]); //carico le quantità delle risorse per il costo
	return new Cost(costData["relativeTime"], quantityResources); //creo il costo con le caratteristiche individuate
};

/**
 * Carica le quantità di risorse indicate nel frammento dei dati.
 * @param {Object} quantityResourcesDatas I dati contenti le quantità di risorse.
 * @return {Array.<QuantityResource>} Le quantità di risorse caricate.
 */
LoadGeneralData.prototype.loadQuantityResource = function (quantityResourcesDatas) {
	var quantityResources = [];
	var dataFactory = DataFactory.getInstance();
	for (var i = 0; i < quantityResourcesDatas.length; i++) {
		var resource = dataFactory.getResource(quantityResourcesDatas[i]["resource"]); //ottengo la risorsa precedentemente caricata
		quantityResources.push(new QuantityResource(quantityResourcesDatas[i]["quantity"], resource)); //creo una nuova quantità di risorsa con le caratteristiche individuate
	}
	return quantityResources;
};

/**
 * Carica gli edifici indicati nel frammento dei dati.
 * @param {Object} buildingsDatas I dati contententi gli edifici.
 * @return {Array.<BuildingWithLevel>} Gli edifici caricati.
 */
LoadGeneralData.prototype.loadBuildings = function (buildingsDatas) {
	var buildings = [];
	var preconditionsDatas = [];
	for (var i = 0; i < buildingsDatas.length; i++) {
		var nameBuilding = buildingsDatas[i]["nameBuilding"]; //ottengo il nome
		var level = buildingsDatas[i]["level"]; //ottengo il livello
		var cost = this.loadCost(buildingsDatas[i]["cost"]); //ottengo il costo di costruzione
		var unitsSpace = buildingsDatas[i]["unitsSpace"]; //ottengo lo spazio disponibile per le unità
		var precondition = buildingsDatas[i]["precondition"]; //ottengo le precondizioni per costruire l'edificio
		var productedResources = this.loadProductedResources(buildingsDatas[i]["productedResource"]); //ottengo le risorse producibili dall'edificio
		var productedUnits = this.loadProductedUnits(buildingsDatas[i]["productedUnits"]); //ottengo le unità producibili dall'edificio
		var bonus = this.loadBonus(buildingsDatas[i]["bonus"]); //ottengo il bonus fornito dall'edificio
		var isConstructible = buildingsDatas[i]["isConstructible"]; //ottengo la possibilità di costruire l'edificio o meno
		var isDestructible = buildingsDatas[i]["isDestructible"]; //ottengo la possibilità di costruire l'edificio o meno
		var building = new BuildingWithLevel(bonus, cost, level, nameBuilding, null, productedResources, productedUnits, unitsSpace, isConstructible, isDestructible); //creo l'edificio secondo i parametri individuati
		buildings[building.getKey()] = building; //associo gli edifici alla loro chiave
		preconditionsDatas[building.getKey()] = precondition;
	}

	//poiché le precondizioni richiedono l'aver già inserito gli edifici corrispondenti, vengono inserite in questo momento
	for (var key in buildings)
		for (var j = 0; j < preconditionsDatas[key].length; j++)
			buildings[key].addPrecondition(buildings[preconditionsDatas[key][j]]); //inserisco la dipendenza

	return buildings;
};

/**
 * Carica le risorse producibili nel frammento dei dati.
 * @param {Object} productedResourceDatas I dati contenenti le risorse producibili.
 * @return {ProductedResource} Le risorse producibili caricate.
 */
LoadGeneralData.prototype.loadProductedResources = function (productedResourceDatas) {
	if (productedResourceDatas["resource"] === undefined)
		return null;
	var dataFactory = DataFactory.getInstance();
	var resource = dataFactory.getResource(productedResourceDatas["resource"]); //ottengo le risorse già caricate
	var relativeTime = productedResourceDatas["relativeTime"];
	var quantity = productedResourceDatas["quantity"];
	var maxQuantity = productedResourceDatas["maxQuantity"];
	return new ProductedResource(maxQuantity, quantity, relativeTime, resource); //creo la risorsa producibile secondo i dati individuati
};

/**
 * Carica le unità producibili nel frammento dei dati.
 * @param {Object} productedUnitsDatas I dati contenenti le unità producibili.
 * @return {Array.<Unit>} Le unità producibili caricate.
 */
LoadGeneralData.prototype.loadProductedUnits = function (productedUnitsDatas) {
	var productedUnits = [];
	var dataFactory = DataFactory.getInstance();
	for (var i = 0; i < productedUnitsDatas.length; i++) {
		productedUnits.push(dataFactory.getUnit(productedUnitsDatas[i])); //creo le unità producibili individuate
	}
	return productedUnits;
};

/**
 * Carica i bonus nel frammento dei dati.
 * @param {Object} bonusDatas I dati contenenti i bonus.
 * @return {Bonus} I bonus caricate.
 */
LoadGeneralData.prototype.loadBonus = function (bonusDatas) {
	return new Bonus(bonusDatas["bonusName"], bonusDatas["type"], bonusDatas["quantity"]); //creo il bonus secondo le proprietà individuate
};

/**
 * Imposta i dati da cui verrà caricare il modello.
 * @param {Object} datas I dati da cui caricare il modello.
 * @return {void}
 */
LoadGeneralData.prototype.setActionDatas = function (datas) { //datas è nel formato units, resources e buildings
	this.datas = datas;
};