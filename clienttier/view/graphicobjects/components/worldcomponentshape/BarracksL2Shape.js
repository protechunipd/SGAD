/**
 * FILE: BarracksL2Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/BarracksL2Shape.js
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
BarracksL2Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
BarracksL2Shape.prototype.constructor = BarracksL2Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una caserma di livello 2.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function BarracksL2Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(70, 0));
	shape.addPoint(new Point2D(74, 3));
	shape.addPoint(new Point2D(74, 9));
	shape.addPoint(new Point2D(80, 6));
	shape.addPoint(new Point2D(84, 10));
	shape.addPoint(new Point2D(85, 16));
	shape.addPoint(new Point2D(90, 13));
	shape.addPoint(new Point2D(94, 16));
	shape.addPoint(new Point2D(94, 22));
	shape.addPoint(new Point2D(100, 19));
	shape.addPoint(new Point2D(104, 23));
	shape.addPoint(new Point2D(104, 29));
	shape.addPoint(new Point2D(110, 26));
	shape.addPoint(new Point2D(114, 29));
	shape.addPoint(new Point2D(114, 35));
	shape.addPoint(new Point2D(120, 32));
	shape.addPoint(new Point2D(124, 36));
	shape.addPoint(new Point2D(124, 79));
	shape.addPoint(new Point2D(139, 89));
	shape.addPoint(new Point2D(70, 134));
	shape.addPoint(new Point2D(0, 89));
	shape.addPoint(new Point2D(15, 79));
	shape.addPoint(new Point2D(15, 57));
	shape.addPoint(new Point2D(19, 54));
	shape.addPoint(new Point2D(24, 57));
	shape.addPoint(new Point2D(25, 50));
	shape.addPoint(new Point2D(30, 47));
	shape.addPoint(new Point2D(34, 50));
	shape.addPoint(new Point2D(35, 44));
	shape.addPoint(new Point2D(40, 40));
	shape.addPoint(new Point2D(40, 19));
	shape.addPoint(new Point2D(45, 16));
	shape.addPoint(new Point2D(49, 19));
	shape.addPoint(new Point2D(50, 13));
	shape.addPoint(new Point2D(59, 6));
	shape.addPoint(new Point2D(64, 9));
	shape.addPoint(new Point2D(65, 3));

	this.image.src = "canvas/images/Caserma_L2.png";
}
