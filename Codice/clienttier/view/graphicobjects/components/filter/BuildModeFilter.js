/**
 * FILE: BuildModeFilter.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/filter/BuildModeFilter.js
 * DATA CREAZIONE: 15 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-15 - Creazione della classe - Battistella Stefano
 */

//Eredita da GraphicFilter.
BuildModeFilter.prototype = new GraphicFilter();

//Costruttore della classe.
BuildModeFilter.prototype.constructor = BuildModeFilter;

/**
 * Classe per la gestione del filtro quando viene selezionata la modalità di costruzione.
 * @implemets GraphicFilter
 * @constructor
 * @param {BuildingComponent} buildingComponent L'oggetto grafico rappresentante l'edificio nel mondo di gioco.
 */
function BuildModeFilter(buildingComponent) {
	/**
	 * Oggetto grafico rappresentante l'edificio all'interno del mondo di gioco.
	 * @type {BuildingComponent}
     * @private
	 */
	this.buildingComponent = buildingComponent;
    /**
     * Imposta il filtro.
     * @return {void}
     * @private
     */
	this.buildingComponent.setFilter(this);
    /**
     * L'istanza dell'oggetto bound.
     * @type {Bound}
     * @private
     */
	this.bound = Bound.getInstance();
	/**
	 * Il poligono e l'immagine rappresentante l'edificio in modo tale da non ostruire la visuale.
	 * @type {WorldComponentShapeImg}
     * @private
	 */
	this.tile = WorldComponentShapeFactory.getInstance().getWorldComponentShapeImg("Tile");

}
/**
 * Rappresenta l'oggetto grafico nel mondo di gioco in modo tale da non ostruire la visuale delle caselle.
 * @override
 * @param {CanvasRenderingContext2D} drawArea Area di disegno sulla quale verrà disegnato l'oggetto.
 * @return {void}
 */
BuildModeFilter.prototype.draw = function (drawArea) {
	var y;
	var position = this.buildingComponent.getPosition();

	//ottengo la posizione nel mondo di gioco dell'edificio
	var offset = this.bound.getTopLeftOffset();
	//ottengo la traslazione generale del bound

	var points = this.tile.getShape().getPoints();
	var image = this.tile.getImage();
	//l'immagine da rappresentare

	drawArea.beginPath();
	//inizio del percorso

	var x = position.getX() * image.width;
	y = position.getY() * image.height / 2;

	if (position.getY() % 2 === 1)//se l'edificio si trova in y dispari allora devo traslare di metà la sua posizione
		x += image.width / 2;

	this.buildingComponent.setTopLeftOffset(new Point2D(x - offset.getX(), y - offset.getY()));

	if (x >= offset.getX() + this.bound.getWidth() || x + image.width <= offset.getX() || y >= offset.getY() + this.bound.getHeight() || y + image.height <= offset.getY())
		return;

	drawArea.drawImage(image, x - offset.getX(), y - offset.getY()); //rappresento l'immagine della casella


	drawArea.moveTo(points[0].getX() + x - offset.getX(), points[0].getY() + y - offset.getY()); //rappresento la shape
	for (var i = 1; i < points.length; i++) {
		drawArea.lineTo(points[i].getX() + x - offset.getX(), points[i].getY() + y - offset.getY());
	}
	drawArea.fillStyle = "red";
	//il colore rosso indica che la posizione è occupata da un edificio
	drawArea.strokeStyle = "red";
	drawArea.globalAlpha = 0.35;
	//impongo che la casella rossa sia trasparente per permettere di visualizzare anche la casella sottostante

	drawArea.closePath();
	//chiudo il percorso
	drawArea.fill();
	drawArea.globalAlpha = 1;
	//ripristino l'opacità
	drawArea.stroke();
};

/**
 * Fornisce il poligono rappresentante l'oggetto grafico.
 * @override
 * @return {Shape} Il poligono rappresentante l'oggetto grafico.
 */
BuildModeFilter.prototype.getShape = function () {
	return this.tile.getShape();
};
