/**
 * FILE: WizardTowerL2Shape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/WizardTowerL2Shape.js
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
WizardTowerL2Shape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
WizardTowerL2Shape.prototype.constructor = WizardTowerL2Shape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una torre dello stregone di livello 2.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function WizardTowerL2Shape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(0, 139));
	shape.addPoint(new Point2D(32, 120));
	shape.addPoint(new Point2D(42, 34));
	shape.addPoint(new Point2D(42, 30));
	shape.addPoint(new Point2D(45, 27));
	shape.addPoint(new Point2D(45, 16));
	shape.addPoint(new Point2D(55, 9));
	shape.addPoint(new Point2D(59, 12));
	shape.addPoint(new Point2D(59, 7));
	shape.addPoint(new Point2D(69, 0));
	shape.addPoint(new Point2D(80, 7));
	shape.addPoint(new Point2D(80, 12));
	shape.addPoint(new Point2D(85, 9));
	shape.addPoint(new Point2D(94, 16));
	shape.addPoint(new Point2D(94, 27));
	shape.addPoint(new Point2D(97, 30));
	shape.addPoint(new Point2D(97, 34));
	shape.addPoint(new Point2D(108, 119));
	shape.addPoint(new Point2D(139, 139));
	shape.addPoint(new Point2D(69, 184));
	
	this.image.src = "canvas/images/Torre_Dello_Stregone_L2.png";
}
