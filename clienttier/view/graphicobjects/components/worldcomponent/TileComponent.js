/**
 * FILE: TileComponent.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponent/TileComponent.js
 * DATA CREAZIONE: 17 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-17 - Creazione della classe - Battistella Stefano
 */

//Eredita da WorldComponent.
TileComponent.prototype = new WorldComponent();

//Costruttore della classe.
TileComponent.prototype.constructor = TileComponent;

/**
 * Classe per la rappresentazione di una casella nella mappa.
 * @extends WorldComponent
 * @constructor
 * @param {Position} position La posizione associata alla casella.
 */
function TileComponent(position) {
	/**
	 * La posizione associata alla casella.
	 * @type {Position}
     * @private
	 */
	this.position = position;

	/**
	 * L'azione da eseguire al verificarsi dell'evento click.
	 * @type {Action}
	 * @private
	 */
	this.onClickAction = null;

	/**
	 * L'azione da eseguire al verificarsi dell'evento rightclick.
	 * @type {Action}
     * @private
	 */
	this.onRightClickAction = null;

	/**
	 * La forma della casella da rappresentare nel mondo di gioco.
	 * @type {WorldComponentShapeImg}
     * @private
	 */
	this.worldComponentShape = WorldComponentShapeFactory.getInstance().getWorldComponentShapeImg("Tile");

	/**
	 * La posizione del punto in alto a sinistra.
	 * @type {Point2D}
     * @private
	 */
	this.topLeftOffset = new Point2D(0, 0);

	/**
	 * Il riferimento alle informazioni della telecamera.
	 * @type {Bound}
     * @private
	 */
	this.bound = Bound.getInstance();
    /**
     * Coordinata z della casella.
     * @type {int}
     * @private
     */
	this.zIndex = position.getY();
}

/**
 * @override
 * @inheritDoc
 * @return {void}
 */
TileComponent.prototype.onClick = function() {
	if(this.onClickAction !== null)
		this.onClickAction.performAction();
};

/**
 * @override
 * @inheritDoc
 * @return {void}
 */
TileComponent.prototype.onRightClick = function() {
	if(this.onRightClickAction !== null)
		this.onRightClickAction.performAction();
};

/**
 * Fornisce la forma rappresentante la casella.
 * @override
 * @return {Shape}
 */
TileComponent.prototype.getShape = function() {
	return this.worldComponentShape.getShape();
};

/**
 * Fornisce il poligono e l'immagine rappresentante la casella nel mondo di gioco.
 * @return {WorldComponentShapeImg}
 */
TileComponent.prototype.getWorldComponentShape = function() {
	return this.worldComponentShape;
};

/**
 * Fornisce la posizione associata alla casella.
 * @return {Position}
 */
TileComponent.prototype.getPosition = function() {
	return this.position;
};

/**
 * Rappresenta la casella nel mondo di gioco.
 * @override
 * @param {CanvasRenderingContext2D} drawArea L'area nella quale rappresentare la casella.
 * @return {void}
 */
TileComponent.prototype.draw = function(drawArea) {
	var image = this.worldComponentShape.getImage();
	var offset = this.bound.getTopLeftOffset();
	var offTopLeftX = offset.getX();
	var offTopLeftY = offset.getY();
	//ottengo la posizione nel mondo di gioco dell'edificio
	var imgTopLeftX = this.position.getX() * image.width;
	var imgTopLeftY = this.position.getY() * image.height / 2;
	//ottengo la traslazione  e dimensioni del bound
	if (this.position.getY() % 2 === 1)//se la casella si trova in y dispari allora devo traslare di met? la sua posizione
		imgTopLeftX += image.width / 2;

	this.setTopLeftOffset(new Point2D(imgTopLeftX - offTopLeftX, imgTopLeftY - offTopLeftY));

	//se la casella si trova al di fuori dei limiti del bound allora non viene rappresentata
	if (imgTopLeftX >= offTopLeftX + this.bound.getWidth() || imgTopLeftX + image.width <= offTopLeftX || imgTopLeftY >= offTopLeftY + this.bound.getHeight() || imgTopLeftY + image.height <= offTopLeftY)
		return;

	drawArea.drawImage(image, imgTopLeftX - offTopLeftX, imgTopLeftY - offTopLeftY);
	//rappresento l'immagine della casella
};