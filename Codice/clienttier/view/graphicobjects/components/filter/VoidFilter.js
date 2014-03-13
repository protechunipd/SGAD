/**
 * FILE: VoidFilter.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/filter/VoidFilter.js
 * DATA CREAZIONE: 15 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-15 - Creazione della classe - Gallo Francesco
 */

//Eredita da GraphicFilter.
VoidFilter.prototype = new GraphicFilter();

//Costruttore della classe.
VoidFilter.prototype.constructor = VoidFilter;

/**
 * Classe per la gestione di un filtro che non deve modificare la rappresentazione dell'edificio.
 * @implemets GraphicFilter
 * @constructor
 * @param {BuildingComponent} buildingComponent
 */
function VoidFilter(buildingComponent) {
	/**
	 * L'oggetto grafico rappresentante un edificio all'interno dell'area grafica.
	 * @type {BuildingComponent}
     * @private
	 */
	this.buildingComponent = buildingComponent;
    /**
     * Imposta il filtro sull'edificio.
     * @return {void}
     */
	this.buildingComponent.setFilter(this);
    /**
     * L'unica istanza dell'oggetto di tipo Bound.
     * @type {Bound}
     * @private
     */
	this.bound = Bound.getInstance();
    /**
     * L'immagine rappresentante l'oggetto grafico associato alla casella.
     * @type {Image}
     * @private
     */
	this.tile = WorldComponentShapeFactory.getInstance().getWorldComponentShapeImg("Tile").getImage();
    /**
     * L'immagine rappresentante le risorse collezionate.
     * @type {Image}
     * @private
     */
	this.storedResourcesImage = new Image();
    /**
     * Il path dove reperire l'immagine.
     * @type {URL}
     * @private
     */
    this.storedResourcesImage.src = "canvas/images/StoredResources.png";
}
/**
 * Rappresenta l'oggetto grafico nel mondo di gioco senza applicare alcun filtro.
 * @override
 * @param {CanvasRenderingContext2D} drawArea L'area in cui deve essere rappresentato l'oggetto grafico.
 * @return {void}
 */
VoidFilter.prototype.draw = function(drawArea) {
	var building = this.buildingComponent;
	var storedResources = building.buildingPossession.getStoredResources();
	var image;
	if(building.buildingPossession.getIsFinished())
		image = building.getWorldComponentShape().getImage();
	else
		image = WorldComponentShapeFactory.getInstance().getWorldComponentShapeImg("InCostruzione").getImage();
	//ottengo la posizione nel mondo di gioco dell'edificio
	var position = building.getPosition();
	var offset = this.bound.getTopLeftOffset();
	var offTopLeftX = offset.getX();
	var offTopLeftY = offset.getY();
	//ottengo la traslazione  e dimensioni del bound

	var imgTopLeftX = position.getX() * image.width;
	var imgTopLeftY = position.getY() * this.tile.height / 2 - (image.height - this.tile.height);


	if (position.getY() % 2 === 1)//se l'edificio si trova in y dispari allora devo traslare di metà la sua posizione
		imgTopLeftX += image.width / 2;

	this.buildingComponent.setTopLeftOffset(new Point2D(imgTopLeftX - offTopLeftX, imgTopLeftY - offTopLeftY));

	if (imgTopLeftX >= offTopLeftX + this.bound.getWidth() || imgTopLeftX + image.width <= offTopLeftX || imgTopLeftY >= offTopLeftY + this.bound.getHeight() || imgTopLeftY + image.height <= offTopLeftY)
		return;

	drawArea.drawImage(image, imgTopLeftX - offTopLeftX, imgTopLeftY - offTopLeftY);
	//rappresento l'immagine della casella

	if(storedResources > 0) {
		var leftOffset = imgTopLeftX - offTopLeftX + (image.width - this.storedResourcesImage.width) / 2;
		drawArea.drawImage(this.storedResourcesImage, leftOffset, imgTopLeftY - offTopLeftY);
	}
};

/**
 * Fornisce la forma dell'oggetto grafico senza alcuna deformazione o cambiamento.
 * @override
 * @return {Shape} la forma dell'oggetto grafico senza alcuna deformazione o cambiamento.
 */
VoidFilter.prototype.getShape = function() {
	if(this.buildingComponent.buildingPossession.getIsFinished())
		return this.buildingComponent.getWorldComponentShape().getShape();
	else
		return WorldComponentShapeFactory.getInstance().getWorldComponentShapeImg("InCostruzione").getShape();
};
