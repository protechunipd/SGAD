/**
 * FILE: SchoolOfMagicL3Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/SchoolOfMagicL3Shape.js
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
SchoolOfMagicL3Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
SchoolOfMagicL3Shape.prototype.constructor = SchoolOfMagicL3Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una scuola di magia di livello 3.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function SchoolOfMagicL3Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(0, 84));
	shape.addPoint(new Point2D(45, 54));
	shape.addPoint(new Point2D(45, 44));
	shape.addPoint(new Point2D(43, 42));
	shape.addPoint(new Point2D(47, 36));
	shape.addPoint(new Point2D(45, 34));
	shape.addPoint(new Point2D(52, 11));
	shape.addPoint(new Point2D(57, 22));
	shape.addPoint(new Point2D(65, 27));
	shape.addPoint(new Point2D(65, 25));
	shape.addPoint(new Point2D(62, 22));
	shape.addPoint(new Point2D(69, 0));
	shape.addPoint(new Point2D(77, 21));
	shape.addPoint(new Point2D(75, 24));
	shape.addPoint(new Point2D(75, 33));
	shape.addPoint(new Point2D(83, 39));
	shape.addPoint(new Point2D(83, 32));
	shape.addPoint(new Point2D(82, 31));
	shape.addPoint(new Point2D(86, 20));
	shape.addPoint(new Point2D(90, 31));
	shape.addPoint(new Point2D(88, 33));
	shape.addPoint(new Point2D(88, 42));
	shape.addPoint(new Point2D(102, 51));
	shape.addPoint(new Point2D(102, 44));
	shape.addPoint(new Point2D(100, 42));
	shape.addPoint(new Point2D(99, 40));
	shape.addPoint(new Point2D(110, 12));
	shape.addPoint(new Point2D(122, 40));
	shape.addPoint(new Point2D(121, 42));
	shape.addPoint(new Point2D(119, 44));
	shape.addPoint(new Point2D(119, 71));
	shape.addPoint(new Point2D(139, 84));
	shape.addPoint(new Point2D(70, 129));

	this.image.src = "canvas/images/Scuola_Di_Magia_L3.png";
}
