/**
 * FILE: TileShape.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/TileShape.js
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
TileShape.prototype = new WorldComponentShapeImg();

//Costruttore della classe.
TileShape.prototype.constructor = TileShape;

/**
 * Classe per la memorizzazione dell'immagine e del poligono per la rappresentazione di una casella.
 * @extends WorldComponentShapeImg
 * @constructor
 */
function TileShape() {
	var shape = this.shape;
	shape.addPoint(new Point2D(70, 0));
	shape.addPoint(new Point2D(139, 45));
	shape.addPoint(new Point2D(69, 90));
	shape.addPoint(new Point2D(0, 45));

	this.image.src = "canvas/images/Casella.png";
}
