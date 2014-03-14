/**
 * FILE: WizardTowerL3Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/WizardTowerL3Shape.js
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
WizardTowerL3Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
WizardTowerL3Shape.prototype.constructor = WizardTowerL3Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una torre dello stregone di livello 3.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function WizardTowerL3Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(0, 186));
	shape.addPoint(new Point2D(31, 166));
	shape.addPoint(new Point2D(42, 77));
	shape.addPoint(new Point2D(45, 74));
	shape.addPoint(new Point2D(45, 63));
	shape.addPoint(new Point2D(47, 61));
	shape.addPoint(new Point2D(47, 3));
	shape.addPoint(new Point2D(52, 0));
	shape.addPoint(new Point2D(55, 2));
	shape.addPoint(new Point2D(55, 23));
	shape.addPoint(new Point2D(60, 27));
	shape.addPoint(new Point2D(60, 42));
	shape.addPoint(new Point2D(64, 45));
	shape.addPoint(new Point2D(65, 50));
	shape.addPoint(new Point2D(69, 47));
	shape.addPoint(new Point2D(74, 50));
	shape.addPoint(new Point2D(74, 47));
	shape.addPoint(new Point2D(80, 42));
	shape.addPoint(new Point2D(80, 26));
	shape.addPoint(new Point2D(85, 22));
	shape.addPoint(new Point2D(85, 2));
	shape.addPoint(new Point2D(87, 0));
	shape.addPoint(new Point2D(92, 4));
	shape.addPoint(new Point2D(92, 61));
	shape.addPoint(new Point2D(94, 63));
	shape.addPoint(new Point2D(94, 75));
	shape.addPoint(new Point2D(97, 77));
	shape.addPoint(new Point2D(97, 81));
	shape.addPoint(new Point2D(108, 166));
	shape.addPoint(new Point2D(139, 186));
	shape.addPoint(new Point2D(70, 231));

	this.image.src = "canvas/images/Torre_Dello_Stregone_L3.png";
}
