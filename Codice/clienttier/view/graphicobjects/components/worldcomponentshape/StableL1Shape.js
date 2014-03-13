/**
 * FILE: StableL1Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/StableL1Shape.js
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
StableL1Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
StableL1Shape.prototype.constructor = StableL1Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una stalla di livello 1.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function StableL1Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(0, 72));
	shape.addPoint(new Point2D(45, 42));
	shape.addPoint(new Point2D(45, 28));
	shape.addPoint(new Point2D(41, 24));
	shape.addPoint(new Point2D(67, 0));
	shape.addPoint(new Point2D(122, 36));
	shape.addPoint(new Point2D(120, 38));
	shape.addPoint(new Point2D(120, 59));
	shape.addPoint(new Point2D(139, 72));
	shape.addPoint(new Point2D(70, 117));

	this.image.src = "canvas/images/Stalla_L1.png";
}
