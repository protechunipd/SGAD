/**
 * FILE: BuildingComponent.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponent/BuildingComponent.js
 * DATA CREAZIONE: 16 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-16 - Implementazione dei metodi getBuildingPossession(), getShape(),
 * getWorldComponentShape(), setType(_type), setFilter(_filter) e getPosition() - Battistella Stefano
 * 2014-02-16 - Creazione della classe - Battistella Stefano
 */

//Eredita da WorldComponent.
BuildingComponent.prototype = $.extend(new WorldComponent(), new Observer());

//Costruttore della classe.
BuildingComponent.prototype.constructor = BuildingComponent;

/**
 * Classe per la rappresentazione di un edificio generico all'interno dell'area di gioco.
 * @extends WorldComponent
 * @implements Observer
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio che deve essere rappresentato.
 * @param {string} type Tipo di edificio da rappresentare.
 */
function BuildingComponent(buildingPossession, type) {
	/**
	 * L'edificio che deve essere rappresentato.
	 * @type {BuildingPossession}
     * @private
	 */
	this.buildingPossession = buildingPossession;
	/**
	 * L'azione da eseguire al verificarsi del click sulla componente.
	 * @type {Action}
     * @private
	 */
	this.onClickAction = null;
	/**
	 * L'azione da eseguire al verificarsi del rightclick sulla componente.
	 * @type {Action}
     * @private
	 */
	this.onRightClickAction = null;
	/**
	 * La forma della componente che deve essere rappresentata.
	 * @type {WorldComponentShapeImg}
     * @private
	 */
	this.worldComponentShape = WorldComponentShapeFactory.getInstance().getWorldComponentShapeImg(type);
	/**
	 * Il filtro grafico che deve essere applicato alla rappresentazione.
	 * @type {GraphicFilter}
     * @private
	 */
	this.filter = null;
    /**
     * Coordinata z dell'edificio.
     * @type {int}
     * @private
     */
	this.zIndex = buildingPossession.getPosition().getY();
}

/**
 * Esegue l'azione associata al verificarsi dell'evento click.
 * @return {void}
 */
BuildingComponent.prototype.onClick = function() {
	if(this.onClickAction !== null)
		this.onClickAction.performAction();
};

/**
 * Fornisce i dati dell'edificio che viene rappresentato.
 * @return {BuildingPossession} I dati dell'edificio rappresentato.
 */
BuildingComponent.prototype.getBuildingPossession = function() {
	return this.buildingPossession;
};

/**
 * Esegue l'azione associata al verificarsi dell'evento click destro.
 * @return {void}
 */
BuildingComponent.prototype.onRightClick = function() {
	if(this.onRightClickAction !== null)
		this.onRightClickAction.performAction();
};

/**
 * Fornisce il poligono che rappresenta l'oggetto grafico.
 * @inheritDoc
 * @return {Shape}
 */
BuildingComponent.prototype.getShape = function() {
	if(this.filter === null)
		return this.shape;
	return this.filter.getShape();
};

/**
 * Fornisce l'immagine e il poligono per rappresentare l'oggetto del mondo di gioco.
 * @return {WorldComponentShapeImg} L'immagine e il poligono.
 */
BuildingComponent.prototype.getWorldComponentShape = function() {
	return this.worldComponentShape;
};

/**
 * Imposta il tipo della componente.
 * @param {string} _type Il tipo della classe.
 * @return {void}
 */
BuildingComponent.prototype.setType = function(_type) {
	this.worldComponentShape = WorldComponentShapeFactory.getInstance().getWorldComponentShapeImg(_type);
};

/**
 * Imposta il filtro grafico che deve essere applicato.
 * @param {GraphicFilter} _filter Il filtro grafico che deve essere applicato.
 * @return {void}
 */
BuildingComponent.prototype.setFilter = function(_filter) {
	this.filter = _filter;
};

/**
 * Fornisce la posizione dell'edificio che viene rappresentato.
 * @return {Position} La posizione dell'edificio che deve essere rappresentato.
 */
BuildingComponent.prototype.getPosition = function() {
	return this.buildingPossession.getPosition();
};

/**
 * Disegna l'edificio.
 * @override
 * @inheritDoc
 * @param {CanvasRenderingContext2D} drawArea L'area nella quale rappresentare l'edificio.
 */
BuildingComponent.prototype.draw = function(drawArea) {
	if(this.filter !== null)
		this.filter.draw(drawArea);
};

/**
 * Aggiorna il tipo di edificio.
 * @override
 * @return {void}
 */
BuildingComponent.prototype.update = function() {
	this.setType(this.buildingPossession.getBuilding().getKey());
};