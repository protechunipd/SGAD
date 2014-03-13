/**
 * FILE: GraphicObject.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/graphicobject/GraphicObject.js
 * DATA CREAZIONE: 11 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-11 - Creazione della classe - Battistella Stefano
 */

 /**
 * Classe astratta per la rappresentazione di un qualsiasi oggetto grafico all'interno dell'area di gioco.
 * @abstract
 * @constructor
 */
function GraphicObject() {
	/**
	 * Profondità dell'oggetto grafico.
	 * @type {int}
	 * @private
	 */
	this.zIndex = 0;
	/**
	 * Indica la posizione in alto a sinistra del rettangolo che contiene l'oggetto grafico.
	 * @type {Point2D}
	 * @private
	 */
	this.topLeftOffset = new Point2D(0, 0);
	/**
	 * Indica se l'oggetto pu? essere traslato o meno.
	 * @type {bool}
     * @private
	 */
	this.isShiftable = true;
	/**
	 * Indica se l'oggetto ignora gli eventi, true, o se li cattura, false.
	 * @type {bool}
     * @private
	 */
    this.ignoreEvents = false;
}
/**
 * Fornisce la profondità dell'oggetto.
 * @return {int} La profondità dell'oggetto.
 */
GraphicObject.prototype.getZIndex = function() {
	return this.zIndex;
};
/**
 * Imposta la profondità dell'oggetto grafico.
 * @param {int} _zIndex La profondità dell'oggetto grafico.
 * @return {void} 
 */
GraphicObject.prototype.setZIndex = function(_zIndex) {
	this.zIndex = _zIndex;
};
/**
 * Fornisce il poligono che rappresenta l'oggetto grafico.
 * @abstract
 * @return {Shape} Il poligono dell'oggetto.
 */
GraphicObject.prototype.getShape = function() {};
/**
 * Fornisce se l'oggetto può essere traslato o meno.
 * @return {bool} Valore per indicare se l'oggetto pu? essere traslato o meno.
 */
GraphicObject.prototype.getIsShiftable = function() {
	return this.isShiftable;
};
/**
 * Fornisce la posizione in alto a sinistra del rettangolo che contiene l'oggetto grafico.
 * @return {Point2D} La posizione in alto a sinistra del rettangolo che contiene l'oggetto grafico.
 */
GraphicObject.prototype.getTopLeftOffset = function() {
	return this.topLeftOffset;
};
/**
 * Imposta la posizione in alto a sinistra del rettangolo che contiene l'oggetto grafico.
 * @param {Point2D} _topLeftOffset La posizione in alto a sinistra del rettangolo che contiene l'oggetto grafico.
 * @return {void}
 */
GraphicObject.prototype.setTopLeftOffset = function(_topLeftOffset) {
	this.topLeftOffset = _topLeftOffset;
};
/**
 * Imposta se l'oggetto può essere traslato o meno.
 * @param {bool} _isShiftable Valore per indicare se l'oggetto pu? essere traslato o meno.
 * @return {void}
 */
GraphicObject.prototype.setIsShiftable = function(_isShiftable) {
	this.isShiftable = _isShiftable;
};
/**
 * Esegue un'azione al verificarsi dell'evento click sull'oggetto.
 * @abstract
 * @return {void}
 */
GraphicObject.prototype.onClick = function() {};
/**
 * Esegue un'azione al verificarsi dell'evento rightclick sull'oggetto.
 * @abstract
 * @return {void}
 */
GraphicObject.prototype.onRightClick = function() {};

/**
 * Controlla se l'oggetto è stato cliccato.
 * @param {Point2D} point Punto rappresentante la posizione del mouse dove è avvenuto l'evento.
 * @return {bool} Ritorna true se l'oggetto è stato cliccato, false se non lo è stato.
 */
GraphicObject.prototype.areYouClicked = function(point) {
    var shiftPoint = new Point2D(point.getX(), point.getY());
    shiftPoint.subPoint2D(this.topLeftOffset);
	return this.getShape().isPointInside(shiftPoint);
};

/**
 * Trasla l'oggetto nella nuova posizione. Viene traslato solamente se può essere traslato.
 * @param {Point2D} point Posizione indicante lo spostamento della traslazione.
 * @return {void}
 */
GraphicObject.prototype.shiftPosition = function(point) {
	if (this.isShiftable)
		this.topLeftOffset.addPoint2D(point);
};

/**
 * Disegna l'oggetto nell'area di disegno richiesta.
 * @abstract
 * @param {CanvasRenderingContext2D} drawArea Area di disegno sulla quale verrà disegnato l'oggetto.
 * @return {void}
 */
GraphicObject.prototype.draw = function(drawArea) {};

/**
 * Fornisce se l'oggetto ignora gli eventi o li cattura.
 * @return {bool} Ritorna true se gli eventi vengono ignorati, false se catturati.
 */
GraphicObject.prototype.getIgnoreEvents = function () {
	return this.ignoreEvents;
};