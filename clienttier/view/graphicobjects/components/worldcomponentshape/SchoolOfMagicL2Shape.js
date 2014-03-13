/**
 * FILE: SchoolOfMagicL2Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/SchoolOfMagicL2Shape.js
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
SchoolOfMagicL2Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
SchoolOfMagicL2Shape.prototype.constructor = SchoolOfMagicL2Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una scuola di magia di livello 2.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function SchoolOfMagicL2Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(70, 0));
	shape.addPoint(new Point2D(76, 19));
	shape.addPoint(new Point2D(76, 22));
	shape.addPoint(new Point2D(75, 24));
	shape.addPoint(new Point2D(75, 33));
	shape.addPoint(new Point2D(83, 40));
	shape.addPoint(new Point2D(83, 32));
	shape.addPoint(new Point2D(82, 31));
	shape.addPoint(new Point2D(86, 21));
	shape.addPoint(new Point2D(89, 31));
	shape.addPoint(new Point2D(88, 32));
	shape.addPoint(new Point2D(88, 43));
	shape.addPoint(new Point2D(101, 51));
	shape.addPoint(new Point2D(101, 43));
	shape.addPoint(new Point2D(100, 41));
	shape.addPoint(new Point2D(100, 38));
	shape.addPoint(new Point2D(110, 13));
	shape.addPoint(new Point2D(121, 38));
	shape.addPoint(new Point2D(121, 41));
	shape.addPoint(new Point2D(120, 43));
	shape.addPoint(new Point2D(119, 71));
	shape.addPoint(new Point2D(139, 84));
	shape.addPoint(new Point2D(70, 129));
	shape.addPoint(new Point2D(0, 84));
	shape.addPoint(new Point2D(45, 54));
	shape.addPoint(new Point2D(45, 44));
	shape.addPoint(new Point2D(43, 42));
	shape.addPoint(new Point2D(46, 37));
	shape.addPoint(new Point2D(46, 35));
	shape.addPoint(new Point2D(45, 33));
	shape.addPoint(new Point2D(45, 31));
	shape.addPoint(new Point2D(52, 11));
	shape.addPoint(new Point2D(55, 21));
	shape.addPoint(new Point2D(64, 27));
	shape.addPoint(new Point2D(64, 24));
	shape.addPoint(new Point2D(62, 21));

	this.image.src = "canvas/images/Scuola_Di_Magia_L2.png";
}
