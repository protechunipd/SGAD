/**
 * FILE: Unit.js
 * PERCORSO /Codice/sgad/clienttier/model/generaldata/Unit.js
 * DATA CREAZIONE: 14 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-15 - Implementazione dei metodi getKey(), getName(), getAttack(), getDefence(), getCost() e valueOf() - Gallo Francesco
 * 2014-02-14 - Creazione della classe - Gallo Francesco
 */
 
 /**
 * Classe per la gestione delle informazioni di una unità.
 * @constructor
 * @param {string} name Il nome dell'unità.
 * @param {int} attack La forza di attacco dell'unità.
 * @param {int} defence La forza di difesa dell'unità.
 * @param {Cost} cost Il costo di produzione dell'unità.
 */
function Unit(name, attack, defence, cost) {
	/**
	 * Il nome dell'unità.
	 * @type {string}
	 * @private
	 */
	this.name = name;
	/**
	 * La forza di attacco dell'unità.
	 * @type {int}
	 * @private
	 */
	this.attack = attack;
	/**
	 * La forza di difesa dell'unit?.
	 * @type {int}
	 * @private
	 */
	this.defence = defence;
	/**
	 * Il costo di produzione dell'unit?.
	 * @type {Cost}
	 * @private
	 */
	this.cost = cost;
}

/**
 * Fornisce la chiave identificativa dell'unità.
 * @returns {string} La chiave identificativa.
 */
Unit.prototype.getKey = function() {
    return this.getName();
};

/**
 * Metodo getter del nome dell'unità.
 * @returns {string} Il nome dell'unità.
 */
Unit.prototype.getName = function() {
    return this.name;
};

/**
 * Metodo getter del valore di attacco dell'unità.
 * @returns {int} Il valore di attacco dell'unità.
 */
Unit.prototype.getAttack = function() {
    return this.attack;
};

/**
 * Metodo getter del valore di difesa dell'unità.
 * @returns {int} Il valore di difesa dell'unità.
 */
Unit.prototype.getDefence = function() {
    return this.defence;
};

/**
 * Metodo getter del costo dell'unità.
 * @returns {Cost} Il costo dell'unità.
 */
Unit.prototype.getCost = function() {
    return this.cost;
};
/**
 * Ridefinizione del metodo valueOf di Unit.
 * @override
 * @returns {string} Il nome identificativo dell'unità.
 */
Unit.prototype.valueOf = function() {
    return  JSON.stringify({name : this.getKey()});
};