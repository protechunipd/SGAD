/**
 * FILE: Point2D.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/point/Point2D.js
 * DATA CREAZIONE: 11 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-11 - Creazione della classe - Gallo Francesco
 */

 /**
 * Classe per la rappresentazione di un punto avente due coordinate.
 * @constructor
 * @param {int} x
 * @param {int} y
 */
function Point2D(x, y) {
	/**
	 * Coordinata x del punto.
	 * @type {int}
     * @private
	 */
	this.x = x;

	/**
	 * Coordinata y del punto.
	 * @type {int}
     * @private
	 */
	this.y = y;
}
/**
 * Ottiene la coordinata x del punto.
 * @return {int} La coordinata x del punto.
 */
Point2D.prototype.getX = function() {
	return this.x;
};

/**
 * Ottiene la coordinata y del punto.
 * @return {int} La coordinata y del punto.
 */
Point2D.prototype.getY = function() {
	return this.y;
};

/**
 * Imposta la coordinata x del punto.
 * @param {int} _x La nuova coordinata x del punto.
 * @return {void}
 */
Point2D.prototype.setX = function(_x) {
	this.x = _x;
};

/**
 * Imposta la coordinata y del punto.
 * @param {int} _y La nuova coordinata y del punto.
 * @return {void}
 */
Point2D.prototype.setY = function(_y) {
	this.y = _y;
};

/**
 * Aggiunge il punto passato come parametro.
 * @param {Point2D} point Punto che si vuole aggiungere.
 * @return {void}
 */
Point2D.prototype.addPoint2D = function(point) {
	this.setX(this.x + point.getX());
	this.setY(this.y + point.getY());
};

/**
 * Rimuove il punto passato come parametro.
 * @param {Point2D} point Punto da rimuovere.
 * @return {void}
 */
Point2D.prototype.subPoint2D = function(point) {
	this.setX(this.x - point.getX());
	this.setY(this.y - point.getY());
};
