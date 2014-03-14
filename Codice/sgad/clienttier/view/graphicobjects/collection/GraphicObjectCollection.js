/**
 * FILE: GraphicObjectCollection.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/collection/GraphicObjectCollection.js
 * DATA CREAZIONE: 14 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-14 - Creazione della classe - Gatto Francesco
 */

//Eredita da Collection.
GraphicObjectCollection.prototype = new Collection();

//Costruttore della classe.
GraphicObjectCollection.prototype.constructor = GraphicObjectCollection;

/**
 * Classe per organizzare l'insieme degli oggetti grafici da rappresentare nel mondo di gioco.
 * @implements Collection
 * @constructor
 */
function GraphicObjectCollection() {
	/**
	 * Il frame rappresentante il menu contestuale attualmente visualizzato.
	 * @type {FrameWidget}
     * @private
	 */
	this.contextualFrame = null;
	/**
	 * La collezione degli oggetti grafici.
	 * Tale collezione deve essere mantenuta in ordine secondo la profondità degli oggetti in essa contenuti.
	 * @type {Array.<GraphicObject>}
     * @private
	 */
	this.graphicObjects = [];
}

/**
 * Imposta un frame come menu contestuale.
 * @param {FrameWidget} frame Il frame da impostare come menu contestuale.
 * @return {void}
 */
GraphicObjectCollection.prototype.addContextualFrame = function(frame) {
	this.contextualFrame = frame;
};

/**
 * Fornisce il frame del menu contestuale.
 * @return {FrameWidget} Il frame del menu contestuale.
 */
GraphicObjectCollection.prototype.getContextualFrame = function () {
	return this.contextualFrame;
};

/**
 * Aggiunge un oggetto grafico alla collezione.
 * @param {GraphicObject} object L'oggetto grafico da aggiungere.
 * @return {void}
 */
GraphicObjectCollection.prototype.addGraphicObject = function(object) {
	var m;
    var graphicObjects = this.graphicObjects;
	var zIndex = object.getZIndex();

	var i = 0;
	for (var j = graphicObjects.length; i !== j; ) {
		m = Math.floor((i + j) / 2);
		if (zIndex > graphicObjects[m].getZIndex())
			i = m + 1;
		else
			j = m;
	}

	this.graphicObjects.splice(i, 0, object);
};
/**
 * Rimuove un oggetto grafico dalla collezione.
 * @param {GraphicObject} object L'oggetto grafico da rimuovere.
 * @return {void}
 */
GraphicObjectCollection.prototype.removeGraphicObject = function(object) {
	var index = this.graphicObjects.indexOf(object);
	if(index > -1)
		this.graphicObjects.splice(index, 1);
};
/**
 * Fornisce l'oggetto grafico memorizzato nell'indice indicato.
 * @param {int} index La posizione dell'oggetto grafico.
 * @return {GraphicObject}
 */
GraphicObjectCollection.prototype.getGraphicObject = function(index) {
	var graphicObject = this.graphicObjects[index];
	if(graphicObject === undefined)
		return null;
	return graphicObject;
};
/**
 * Fornisce un oggetto per accedere alla collezione.
 * @override
 * @return {Iterator}
 */
GraphicObjectCollection.prototype.createIterator = function() {
	return new GraphicObjectIterator(this);
};
/**
 * Fornisce il numero di oggetti contenuti nella collezione.
 * @return {int}
 */
GraphicObjectCollection.prototype.getLength = function() {
	return this.graphicObjects.length;
};
