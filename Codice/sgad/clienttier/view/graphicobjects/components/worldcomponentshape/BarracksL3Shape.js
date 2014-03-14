/**
 * FILE: BarracksL3Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/BarracksL3Shape.js
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
BarracksL3Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
BarracksL3Shape.prototype.constructor = BarracksL3Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una caserma di livello 3.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function BarracksL3Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(69, 0));
	shape.addPoint(new Point2D(74, 3));
	shape.addPoint(new Point2D(74, 9));
	shape.addPoint(new Point2D(80, 6));
	shape.addPoint(new Point2D(84, 9));
	shape.addPoint(new Point2D(84, 15));
	shape.addPoint(new Point2D(90, 13));
	shape.addPoint(new Point2D(94, 16));
	shape.addPoint(new Point2D(94, 43));
	shape.addPoint(new Point2D(100, 41));
	shape.addPoint(new Point2D(104, 44));
	shape.addPoint(new Point2D(104, 50));
	shape.addPoint(new Point2D(109, 48));
	shape.addPoint(new Point2D(114, 50));
	shape.addPoint(new Point2D(114, 56));
	shape.addPoint(new Point2D(120, 54));
	shape.addPoint(new Point2D(124, 57));
	shape.addPoint(new Point2D(124, 100));
	shape.addPoint(new Point2D(139, 110));
	shape.addPoint(new Point2D(70, 155));
	shape.addPoint(new Point2D(0, 110));
	shape.addPoint(new Point2D(15, 100));
	shape.addPoint(new Point2D(14, 78));
	shape.addPoint(new Point2D(20, 75));
	shape.addPoint(new Point2D(24, 77));
	shape.addPoint(new Point2D(25, 71));
	shape.addPoint(new Point2D(30, 69));
	shape.addPoint(new Point2D(34, 71));
	shape.addPoint(new Point2D(35, 65));
	shape.addPoint(new Point2D(40, 61));
	shape.addPoint(new Point2D(40, 19));
	shape.addPoint(new Point2D(45, 16));
	shape.addPoint(new Point2D(49, 19));
	shape.addPoint(new Point2D(50, 13));
	shape.addPoint(new Point2D(60, 6));
	shape.addPoint(new Point2D(64, 9));
	shape.addPoint(new Point2D(65, 3));

	this.image.src = "canvas/images/Caserma_L3.png";
}
