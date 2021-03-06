/**
 * FILE: MineL3Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/MineL3Shape.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Battistella Stefano
 */

//Eredita da WorldComponentShapeImg.
MineL3Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
MineL3Shape.prototype.constructor = MineL3Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una miniera di livello 3.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function MineL3Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(55, 0));
	shape.addPoint(new Point2D(62, 5));
	shape.addPoint(new Point2D(65, 4));
	shape.addPoint(new Point2D(73, 9));
	shape.addPoint(new Point2D(85, 2));
	shape.addPoint(new Point2D(87, 4));
	shape.addPoint(new Point2D(90, 2));
	shape.addPoint(new Point2D(94, 5));
	shape.addPoint(new Point2D(94, 10));
	shape.addPoint(new Point2D(100, 8));
	shape.addPoint(new Point2D(104, 11));
	shape.addPoint(new Point2D(104, 16));
	shape.addPoint(new Point2D(114, 23));
	shape.addPoint(new Point2D(114, 34));
	shape.addPoint(new Point2D(124, 41));
	shape.addPoint(new Point2D(124, 45));
	shape.addPoint(new Point2D(139, 55));
	shape.addPoint(new Point2D(70, 100));
	shape.addPoint(new Point2D(0, 55));
	shape.addPoint(new Point2D(25, 38));
	shape.addPoint(new Point2D(25, 33));
	shape.addPoint(new Point2D(33, 27));
	shape.addPoint(new Point2D(35, 18));
	shape.addPoint(new Point2D(40, 15));
	shape.addPoint(new Point2D(42, 17));
	shape.addPoint(new Point2D(45, 15));
	shape.addPoint(new Point2D(45, 5));
	shape.addPoint(new Point2D(49, 2));
	shape.addPoint(new Point2D(51, 2));

	this.image.src = "canvas/images/Miniera_L3.png";
}
