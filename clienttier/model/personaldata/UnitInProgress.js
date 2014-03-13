/**
 * FILE: UnitInProgress.js
 * PERCORSO /Codice/sgad/clienttier/model/personaldata/UnitInProgress.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Gallo Francesco
 */

//Eredita da Observable e da UnitPossession.
UnitInProgress.prototype = $.extend(new Observable(), new UnitPossession(UnitInProgress.quantity, UnitInProgress.unit));

//Costruttore della classe.
UnitInProgress.prototype.constructor = UnitInProgress;

/**
 * Classe per la gestione della coda di costruzione di unità di un particolare edificio.
 * @extends Observable
 * @constructor
 * @param {int} remainingTime Il tempo rimanente alla costruzione della prossima unità.
 * @param {Unit} unit Il tipo di unità.
 * @param {int} quantity La quantità di unità.
 */
function UnitInProgress(remainingTime, unit, quantity) {
    /**
     * Il tempo rimanente alla costruzione della prossima unità.
     * @type {int}
     * @private
     */
    this.remainingTime = remainingTime;
    /**
     * Il tipo di unità.
     * @type {Unit}
     * @private
     */
    this.unit = unit;
    /**
     * La quantità di unità.
     * @type {int}
     * @private
     */
    this.quantity = quantity;
}
/**
 * Metodo getter per remainingTime.
 * @return {int} Quanto tempo rimane per la prossima unità.
 */
UnitInProgress.prototype.getRemainingTime = function() {
    return this.remainingTime;
};
/**
 * Metodo setter per remainingTime.
 * @param {int} remainingTime Il tempo rimanente per la prossima unità.
 * @return {void}
 */
UnitInProgress.prototype.setRemainingTime = function(remainingTime) {
	this.remainingTime = remainingTime;
	this.notify();
};
/**
 * Ridefinizione del metodo valueOf per UnitInProgress.
 * @override
 * @return {string} L'identificativo di UnitInProgress.
 */
UnitInProgress.prototype.valueOf = function(){
    return  JSON.stringify({remainingTime : this.getRemainingTime(), unit : this.getUnit(), quantity : this.getQuantity() });
};