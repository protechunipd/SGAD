/**
 * FILE: Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/shape/Shape.js
 * DATA CREAZIONE: 11 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-11 - Creazione della classe - Gatto Francesco
 * 2014-02-13 - Implementazione del metodo isPointInside(point) - Gatto Francesco
 */

/**
* Classe per la gestione di un insieme di punti rappresentanti un poligono.
* @constructor
*/
function Shape() {
	/**
	 * Lista ordinata di punti rappresentanti i vertici del poligono.
	 * Almeno uno dei punti deve essere posizionato sull'asse y e un altro deve esserlo sull'asse x.
	 * @type {Array.<Point2D>}
	 * @private
	 */
	this.points = [];
}
/**
 * Controlla l'accesso alla lista dei punti.
 * @return {Array.<Point2D>} Lista degli punti.
 */
Shape.prototype.getPoints = function() {
	return this.points;
};

/**
 * Aggiunge un punto al poligono in ultima posizione.
 * @param {Point2D} point Il punto da aggiungere.
 * @return {void}
 */
Shape.prototype.addPoint = function(point) {
	var points = this.points;
	points.push(point);
};

/**
 * Rimuove il punto dal poligono.
 * @param {Point2D} point Il punto da rimuovere.
 * @return {void}
 */
Shape.prototype.removePoint = function(point) {
	var points = this.points;
	var index = points.indexOf(point);
	if (index > -1)
		points.splice(index, 1);
};

/**
 * Controlla che il punto richiesto sia all'interno o meno del poligono che l'oggetto rappresenta.
 * @param {Point2D} point Punto in 2 dimensioni sul quale deve essere effettuato il controllo.
 * Il punto non deve essere aver subito traslazioni.
 * Nel caso deve essere riportato allo stato originario.
 * @return {bool} dice se il punto richiesto è al'interno o meno del poligono che l'oggetto rappresenta.
 */
Shape.prototype.isPointInside = function(point) {
	var y;
    var x;
    var context;
    var canvas;
    var points = this.points;
	if (points.length === 0) {
		return false;
	} else {
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		context.beginPath();
		context.moveTo(points[0].getX(), points[0].getY());
		for (var i = 0; i < points.length; i++) {
			context.lineTo(points[i].getX(), points[i].getY());
        }
        context.closePath();
		x = point.getX();
		y = point.getY();
		return context.isPointInPath(x, y);
	}
};
