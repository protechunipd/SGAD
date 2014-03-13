/**
 * FILE: UserData.js
 * PERCORSO /Codice/sgad/clienttier/model/personaldata/UserData.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Implementazione dei metodi deleteBuildingPossession(key) e addBuildingPossession(buildingPossession) - Gatto Francesco
 * 2014-02-18 - Creazione della classe - Gatto Francesco
 */

//Eredita da Observable
UserData.prototype = new Observable();

//Costruttore della classe
UserData.prototype.constructor = UserData;

/**
 * Classe per la gestione dei dati di un utente.
 * @constructor
 * @param {AuthenticationData} authenticationData I dati personali dell'utente.
 * @param {Array.<BuildingPossession>} ownedBuildings Gli edifici presenti nel villaggio dell'utente.
 * @param {Array.<OwnedResource>} ownedResources Le risorse possedute dall'utente.
 * @param {Array.<UnitPossession>} ownedUnits Le unità possedute dall'utente.
 */
function UserData(authenticationData, ownedBuildings, ownedResources, ownedUnits) {
	/**
	 * I dati personali dell'utente.
	 * @type {AuthenticationData}
	 * @private
	 */
	this.authenticationData = authenticationData;
	/**
	 * Gli edifici presenti nel villaggio dell'utente.
	 * @type {Array.<BuildingPossession>}
	 * @private
	 */
	this.ownedBuildings = ownedBuildings || [];
	/**
	 * Le risorse possedute dall'utente.
	 * @type {Array.<OwnedResource>}
	 * @private
	 */
	this.ownedResources = ownedResources || [];
	/**
	 * Le unità possedute dall'utente.
	 * @type {Array.<UnitPossession>}
	 * @private
	 */
	this.ownedUnits = ownedUnits || [];

    /**
     * Spazio totale utilizzabile per le unità.
     * @type {int}
     * @private
     */
    this.totalUnitSpaces = 0;

    /**
     * Invoca la funzione initializeTotalUnitSpaces().
     * @return {void}
     */
    this.initializeTotalUnitSpaces();
}

/**
 * Inizializza il valore dei posti disponibili per le unità effettuando il calcolo.
 * @returns {void}
 */
UserData.prototype.initializeTotalUnitSpaces = function() {
    var buildings = this.getOwnedBuildings();
    var value = 0;
    for (var key in buildings) {
        if (buildings.hasOwnProperty(key) && buildings[key].getIsFinished()){
        value += (buildings[key].getBuilding().getUnitsSpace());
        }
    }
    this.totalUnitSpaces=value;
    this.notify();
};
/**
 * Metodo getter per l'attributo TotalUnitSpaces.
 * @returns {int} Il numero di spazi totali.
 */
UserData.prototype.getTotalUnitSpaces = function() {
    return this.totalUnitSpaces;
};
/**
 * Controlla l'accesso ai dati personali dell'utente.
 * @return {AuthenticationData} I dati personali dell'utente.
 */
UserData.prototype.getAuthenticationData = function () {
	return this.authenticationData;
};

/**
 * Controlla l'accesso agli edifici presenti nel villaggio dell'utente.
 * @return {Array.<BuildingPossession>} Gli edifici presenti nel villaggio dell'utente.
 */
UserData.prototype.getOwnedBuildings = function () {
	return this.ownedBuildings;
};

/**
 * Controlla l'accesso alle risorse possedute dall'utente.
 * @return {Array.<OwnedResource>} Le risorse possedute dall'utente.
 */
UserData.prototype.getOwnedResources = function () { 
	return this.ownedResources;
};

/**
 * Comtrolla l'accesso alle unità possedute dall'utente.
 * @return {Array.<UnitPossession>} Le unità possedute dall'utente.
 */
UserData.prototype.getOwnedUnits = function () {
	return this.ownedUnits;
};

/**
 * Ritorna la OwnedResource corrispondente alla key in input.
 * @param {string} key La chiave.
 * @return {OwnedResource} La OwnedResource corrispondente alla key in input.
 */
UserData.prototype.getOwnedResource = function (key) {
	var obj = this.ownedResources[key];
	if (obj === undefined) return null;
	else return obj;
};

/**
 * Ritorna la UnitPossession corrispondente alla key in input.
 * @param {string} key La chiave.
 * @return {UnitPossession} La UnitPossession corrispondente alla key in input.
 */
UserData.prototype.getUnitPossession = function (key) {
	var obj = this.ownedUnits[key];
	if (obj === undefined) return null;
	else return obj;
};

/**
 * Fornisce l'edificio posseduto in base alla chiave determinata.
 * @param {string} key La chiave.
 * @return {BuildingPossession} L'edificio posseduto in base alla chiave determinata.
 */
UserData.prototype.getBuildingPossession = function (key) {
    var obj = this.ownedBuildings[key];
    if (obj === undefined) return null;
    else return obj;
};

/**
 * Demolisce l'edificio identificato dalla chiave.
 * @param {string} key La chiave.
 * @return {void}
 */
UserData.prototype.deleteBuildingPossession = function (key) {
	var obj = this.ownedBuildings[key];
	if (obj !== undefined)
	{
		this.ownedBuildings[key].setUnitInProgress(null);
		delete this.ownedBuildings[key];
	}
};

/**
 * Aggiunge l'edificio identificato da buildingPossession.
 * @param {BuildingPossession} buildingPossession L'edificio identificato da buildingPossession.
 * @return {void}
 */
UserData.prototype.addBuildingPossession = function (buildingPossession) {
	this.ownedBuildings[buildingPossession.getKey()] = buildingPossession;
};