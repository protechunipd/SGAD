/**
 * FILE: Position.js
 * PERCORSO /Codice/sgad/clienttier/model/personaldata/Position.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Gallo Francesco
 */

/**
 * Classe per la gestione di una posizione sulla griglia del villaggio.
 * @constructor
 * @param {int} x La coordinata x.
 * @param {int} y La coordinata y.
 */
function Position(x, y) {
	/**
	 * La coordinata x.
	 * @type {int}
	 * @private
	 */
	this.x = x;
	/**
	 * La coordinata y.
	 * @type {int}
	 * @private
	 */
	this.y = y;
}
/**
 * Metodo getter per x.
 * @return {int} Coordinata x.
 */
Position.prototype.getX = function() {
    return this.x;
};

/**
 * Metodo getter per y.
 * @return {int} Coordinata y.
 */
Position.prototype.getY = function() {
    return this.y;
};

/**
 * Ridefinizione del metodo valueOf per Position.
 * @override
 * @return {string} identificativo sulla posizione.
 */
Position.prototype.valueOf = function() {
    return  JSON.stringify({x : this.getX(), y : this.getY()});
};