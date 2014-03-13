/**
 * FILE: StableL2Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/StableL2Shape.js
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Battistella Stefano
 */

//Eredita da WorldComponentShapeImg.
StableL2Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
StableL2Shape.prototype.constructor = StableL2Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una stalla di livello 2.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function StableL2Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(0, 71));
	shape.addPoint(new Point2D(20, 58));
	shape.addPoint(new Point2D(20, 35));
	shape.addPoint(new Point2D(70, 0));
	shape.addPoint(new Point2D(120, 34));
	shape.addPoint(new Point2D(120, 58));
	shape.addPoint(new Point2D(139, 71));
	shape.addPoint(new Point2D(69, 116));

	this.image.src = "canvas/images/Stalla_L2.png";
}
