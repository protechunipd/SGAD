/**
 * FILE: WorldComponentShapeImg.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/WorldComponentShapeImg.js
 * DATA CREAZIONE: 12 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-12 - Creazione della classe - Battistella Stefano
 */

/**
 * Classe astratta per le possibili forme degli edifici e delle unit? che possono essere rappresentate all'interno del mondo di gioco.
 * @constructor
 */
function WorldComponentShapeImg() {
	/**
	 * Il poligono che rappresenta l'oggetto grafico.
	 * @type {Shape}
     * @private
	 */
	this.shape = new Shape();
	/**
	 * L'immagine rappresentante l'oggetto grafico.
	 * @type {Image}
     * @private
	 */
	this.image = new Image();

}
/**
 * Fornisce il poligono rappresentante l'oggetto grafico.
 * @return {Shape} Il poligono rappresentante l'oggetto grafico.
 */
WorldComponentShapeImg.prototype.getShape = function() {
	return this.shape;
};

/**
 * Fornisce l'immagine rappresentante l'oggetto grafico.
 * @return {Image} L'immagine rappresentante l'oggetto grafico.
 */
WorldComponentShapeImg.prototype.getImage = function() {
	return this.image;
};