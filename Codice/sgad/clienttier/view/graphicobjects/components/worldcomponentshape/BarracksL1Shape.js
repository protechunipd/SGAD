/**
 * FILE: BarracksL1Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/BarracksL1Shape.js
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
BarracksL1Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
BarracksL1Shape.prototype.constructor = BarracksL1Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una caserma di livello 1.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function BarracksL1Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(70, 0));
	shape.addPoint(new Point2D(74, 3));
	shape.addPoint(new Point2D(74, 9));
	shape.addPoint(new Point2D(80, 6));
	shape.addPoint(new Point2D(84, 9));
	shape.addPoint(new Point2D(84, 15));
	shape.addPoint(new Point2D(90, 13));
	shape.addPoint(new Point2D(94, 16));
	shape.addPoint(new Point2D(94, 22));
	shape.addPoint(new Point2D(100, 19));
	shape.addPoint(new Point2D(104, 22));
	shape.addPoint(new Point2D(104, 28));
	shape.addPoint(new Point2D(109, 26));
	shape.addPoint(new Point2D(114, 29));
	shape.addPoint(new Point2D(114, 35));
	shape.addPoint(new Point2D(120, 32));
	shape.addPoint(new Point2D(124, 35));
	shape.addPoint(new Point2D(124, 58));
	shape.addPoint(new Point2D(139, 67));
	shape.addPoint(new Point2D(70, 112));
	shape.addPoint(new Point2D(0, 67));
	shape.addPoint(new Point2D(15, 57));
	shape.addPoint(new Point2D(15, 35));
	shape.addPoint(new Point2D(20, 32));
	shape.addPoint(new Point2D(24, 35));
	shape.addPoint(new Point2D(25, 29));
	shape.addPoint(new Point2D(30, 26));
	shape.addPoint(new Point2D(33, 28));
	shape.addPoint(new Point2D(35, 22));
	shape.addPoint(new Point2D(40, 19));
	shape.addPoint(new Point2D(44, 22));
	shape.addPoint(new Point2D(45, 16));
	shape.addPoint(new Point2D(50, 13));
	shape.addPoint(new Point2D(53, 15));
	shape.addPoint(new Point2D(55, 9));
	shape.addPoint(new Point2D(59, 6));
	shape.addPoint(new Point2D(64, 9));
	shape.addPoint(new Point2D(65, 3));

	this.image.src = "canvas/images/Caserma_L1.png";
}
