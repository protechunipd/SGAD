/**
 * FILE: BuildingWithLevel.js
 * PERCORSO /Codice/sgad/clienttier/model/generaldata/BuildingWithLevel.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Implementazione dei metodi getProductedResource(), getProductedUnits(), getUnitsSpace(),
 * getIsConstructible(), getKey(), getNextLevelKey(), addPrecondition(buildingWithLevel) e valueOf() - Gatto Francesco
 * 2014-02-18 - Creazione della classe - Gatto Francesco
 */

/**
 * Classe per la gestione di un edificio ad un particolare livello.
 * @constructor
 * @param {Bonus} bonus Il bonus a disposizione della costruzione.
 * @param {Cost} cost Il costo per costruire la costruzione.
 * @param {int} level Il livello della costruzione.
 * @param {string} nameBuilding Il nome della costruzione.
 * @param {Array.<BuildingWithLevel>} precondition Le costruzioni necessarie per poter costruire questo edificio.
 * @param {ProductedResource} productedResource La risorsa che questo edificio produce.
 * @param {Array.<Unit>} productedUnits Le unità che questo edificio può produrre.
 * @param {int} unitsSpace I posti per le unità che questo edificio offre.
 * @param {bool} isConstructible Indica se l'edificio è direttamente edificabile su una cella dell'area di gioco.
 * @param {bool} isDestructible Indica se l'edificio è rimuovibile.
 */
function BuildingWithLevel(bonus, cost, level, nameBuilding, precondition, productedResource, productedUnits, unitsSpace, isConstructible, isDestructible) {
    /**
	 * Il bonus a disposizione della costruzione.
	 * @type {Bonus}
	 * @private
	 */
	this.bonus = bonus;
    /**
	 * Il costo per costruire la costruzione.
	 * @type {Cost}
	 * @private
	 */
	this.cost = cost;
    /**
	 * Il livello della costruzione.
	 * @type {int}
	 * @private
	 */
	this.level = level;
	/**
	 * Il nome della costruzione.
	 * @type {string}
	 * @private
	 */
	this.nameBuilding = nameBuilding;
	/**
	 * Le costruzioni necessarie per poter costruire questo edificio.
	 * @type {Array.<BuildingWithLevel>}
	 * @private 
	 */
	this.precondition = precondition || [];
	/**
	 * La risorsa che questo edificio produce.
	 * @type {ProductedResource}
	 * @private
	 */
	this.productedResource = productedResource;
	/**
	 * Le unità che questo edificio può produrre.
	 * @type {Array.<Unit>}
	 * @private
	 */
	this.productedUnits = productedUnits || [];
	/**
	 * I posti per le unità che questo edificio offre.
	 * @type {int}
	 * @private
	 */
	this.unitsSpace = unitsSpace;

    /**
     * Indica se l'edificio è direttamente edificabile su una cella dell'area di gioco.
     * @type {boolean}
     * @private
     */
    this.isConstructible = isConstructible;

    /**
     * Indica se l'edificio è rimuovibile.
     * @type {boolean}
     * @private
     */
    this.isDestructible = isDestructible;
}
/**
 * Controlla l'accesso al bonus a disposizione della costruzione.
 * @return {Bonus} Il bonus a disposizione della costruzione.
 */
BuildingWithLevel.prototype.getBonus = function() {
    return this.bonus;
};
/**
 * Controlla l'accesso al costo della costruzione.
 * @return {Cost} Il costo per costruire la costruzione.
 */
BuildingWithLevel.prototype.getCost = function() {
    return this.cost;
};
/**
 * Controlla l'accesso al livello della costruzione.
 * @return {int} Il livello della costruzione.
 */
BuildingWithLevel.prototype.getLevel = function() {
    return this.level;
};
/**
 * Controlla l'accesso al nome della costruzione.
 * @return {string} Il nome della costruzione.
 */
BuildingWithLevel.prototype.getNameBuilding = function() {
    return this.nameBuilding;
};
/**
 * Controlla l'accesso alla collezione di costruzioni necessarie per poter costruire questo edificio.
 * @return {Array.<BuildingWithLevel>} Le costruzioni necessarie per poter costruire questo edificio.
 */
BuildingWithLevel.prototype.getPrecondition = function() {
    return this.precondition;
};
/**
 * Controlla l'accesso alla risorsa che viene prodotta da questo edificio.
 * @return {ProductedResource} La risorsa che questo edificio produce.
 */
BuildingWithLevel.prototype.getProductedResource = function() {
    return this.productedResource;
};
/**
 * Controlla l'accesso alla collezione di unità che questo edificio può produrre.
 * @return {Array.<Unit>} Le unità che questo edificio può produrre.
 */
BuildingWithLevel.prototype.getProductedUnits = function() {
    return this.productedUnits;
};
/**
 * Controlla l'accesso al numero di posti per le unità che offre questo edificio.
 * @return {int} I posti per le unità che questo edificio offre.
 */
BuildingWithLevel.prototype.getUnitsSpace = function() {
    return this.unitsSpace;
};
/**
 * Metodo getter per l'attributo isConstructible.
 * @returns {boolean} Se è edificabile su una cella dell'area di gioco.
 */
BuildingWithLevel.prototype.getIsConstructible = function() {
    return this.isConstructible;
};
/**
 * Metodo getter per l'attributo isDestructible.
 * @returns {boolean} Se è rimuovibile.
 */
BuildingWithLevel.prototype.getIsDestructible = function() {
    return this.isDestructible;
};

/**
 * Fornisce la chiave univoca che identifica l'edificio.
 * @returns {string} La chiave identificativa.
 */
BuildingWithLevel.prototype.getKey = function() {
    return this.nameBuilding+"L"+this.level;
};

/**
 * Fornisce la chiave univoca che identifica il livello successivo dell'edificio.
 * @returns {string} La chiave identificativa.
 */
BuildingWithLevel.prototype.getNextLevelKey = function() {
    var nextLevel = this.level+1;
    return this.nameBuilding+"L"+nextLevel;
};

/**
 * Inserisce una nuova precondizione da soddisfare per poter costruire l'edificio.
 * @param {Array.<BuildingWithLevel>} buildingWithLevel Lista di edifici da costruire soddisfando la precondizione.
 * @return {void}
 */
BuildingWithLevel.prototype.addPrecondition = function(buildingWithLevel) {
	this.precondition.push(buildingWithLevel);
};

/**
 * Ridefinizione del metodo valueOf di BuildingWithLevel.
 * @override
 * @return {string} L'identificativo del BuildingWithLevel.
 */
BuildingWithLevel.prototype.valueOf = function() {
    return JSON.stringify({key : this.getKey()});
};
