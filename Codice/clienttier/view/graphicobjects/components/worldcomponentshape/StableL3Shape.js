/**
 * FILE: StableL3Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/StableL3Shape.js
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
StableL3Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
StableL3Shape.prototype.constructor = StableL3Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una stalla di livello 3.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function StableL3Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(0, 108));
	shape.addPoint(new Point2D(20, 95));
	shape.addPoint(new Point2D(20, 70));
	shape.addPoint(new Point2D(45, 53));
	shape.addPoint(new Point2D(45, 26));
	shape.addPoint(new Point2D(43, 24));
	shape.addPoint(new Point2D(70, 0));
	shape.addPoint(new Point2D(120, 34));
	shape.addPoint(new Point2D(120, 96));
	shape.addPoint(new Point2D(139, 108));
	shape.addPoint(new Point2D(69, 153));

	this.image.src = "canvas/images/Stalla_L3.png";
}
