/**
 * FILE: InConstructionShape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/InConstructionShape.js
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Battistella Stefano
 */

//Eredita da WorldComponentShapeImg.
InConstructionShape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
InConstructionShape.prototype.constructor = InConstructionShape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di un edificio in costruzione.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function InConstructionShape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(85, 0));
	shape.addPoint(new Point2D(101, 27));
	shape.addPoint(new Point2D(101, 37));
	shape.addPoint(new Point2D(139, 62));
	shape.addPoint(new Point2D(70, 107));
	shape.addPoint(new Point2D(0, 62));
	shape.addPoint(new Point2D(38, 37));
	shape.addPoint(new Point2D(38, 35));
	shape.addPoint(new Point2D(68, 15));
	shape.addPoint(new Point2D(68, 8));

	this.image.src = "canvas/images/Costruzione.png";
}
