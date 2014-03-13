/**
 * FILE: UnitPossession.js
 * PERCORSO /Codice/sgad/clienttier/model/personaldata/UnitPossession.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Implementazione dei metodi getQuantity(), setQuantity(quantity), getUnit(), getKey() e valueOf() - Gatto Francesco
 * 2014-02-18 - Creazione della classe - Gatto Francesco
 */

//Eredita da Observable.
UnitPossession.prototype = new Observable();

//Costruttore della classe.
UnitPossession.prototype.constructor = UnitPossession;
/**
 * Classe per la rappresentazione di un'unità con associata una quantità.
 * @extends Observable
 * @constructor
 * @param {int} quantity La quantità di unità.
 * @param {Unit} unit Il tipo di unità.
 **/
function UnitPossession(quantity, unit) {
	/**
	 * La quantità di unità.
	 * @type {int}
	 * @private
	 */
	this.quantity = quantity;
	/**
	 * Il tipo di unità.
	 * @type {Unit}
	 * @private
	 */
	this.unit = unit;
}
/**
 * Metodo getter per la quantità di unità.
 * @return {int} La quantità di unità.
 */
UnitPossession.prototype.getQuantity = function() {
    return this.quantity;
};

/**
 * Metodo setter per la quantità di unità.
 * @param {int} quantity La quantità da impostare.
 * @return {void}
 */
UnitPossession.prototype.setQuantity = function(quantity) {
    this.quantity = quantity;
	this.notify();
};

/**
 * Fornisce un valore numerico rappresentante una quantità.
 * @override
 * @return {int} Il numero di unità.
 */
UnitPossession.prototype.getState = function() {
	return this.getQuantity();
};

/**
 * Imposta il valore numerico rappresentante la quantità.
 * @param {int} quantity La quantità da impostare.
 * @return {void}
 */
UnitPossession.prototype.setState = function(quantity) {
	this.quantity = quantity;
};

/**
 * Metodo getter per il tipo di unità.
 * @return {Unit} il tipo di unità.
 */
UnitPossession.prototype.getUnit = function() {
    return this.unit;
};

/**
 * Metodo getter per la chiave.
 * @return {string} La chiave.
 */
UnitPossession.prototype.getKey = function() {
	return this.unit.getKey();
};

/**
 * Ridefinizione del metodo valueOf di UnitPossession.
 * @override
 * @return {string} L'identificativo di UnitPossession.
 */
UnitPossession.prototype.valueOf = function() {
    return  JSON.stringify({unit : this.getUnit(), quantity : this.getQuantity()});
};