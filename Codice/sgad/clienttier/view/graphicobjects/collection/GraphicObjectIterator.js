/**
 * FILE: GraphicObjectIterator.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/collection/GraphicObjectIterator.js
 * DATA CREAZIONE: 14 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-14 - Creazione della classe - Gallo Francesco
 */

//Eredita da Iterator.
GraphicObjectIterator.prototype = new Iterator();

//Costruttore della classe.
GraphicObjectIterator.prototype.constructor = GraphicObjectIterator;

/**
 * Classe per la gestione di un iteratore per accedere ad una collezione di oggetti grafici.
 * @implements Iterator
 * @constructor
 * @param {GraphicObjectCollection} graphicObjectCollection la collezione di oggetti grafici.
 */
function GraphicObjectIterator(graphicObjectCollection) {

	/**
	 * Posizione attuale dell'iteratore.
	 * @type {int}
     * @private
	 */
	this.index = 0;

	/**
	 * Aggregato associato all'iteratore.
	 * @type {GraphicObjectCollection}
     * @private
	 */
	this.graphicObjectCollection = graphicObjectCollection;

}

/**
 * Sposta l'iteratore al primo elemento della collezione. Il primo elemento sarà l'oggetto grafico con minore profondità.
 * @override
 * @return {void}
 */
GraphicObjectIterator.prototype.first = function() {
	this.index = 0;
};

/**
 * Indica se si è arrivato al termine dell'aggregato.
 * @override
 * @return {bool}
 */
GraphicObjectIterator.prototype.isDone = function() {
	if (this.graphicObjectCollection.getLength() > 0)
		return this.index >= this.graphicObjectCollection.getLength() || this.index < 0;
	else
		return true;
};

/**
 * Sposta l'iteratore all'ultimo elemento della collezione. L'ultimo elemento dovrà essere l'elemento con maggiore profondità.
 * @override
 * @return {void}
 */
GraphicObjectIterator.prototype.last = function() {
	this.index = this.graphicObjectCollection.getLength() - 1;
};

/**
 * Sposta l'iteratore al successivo elemento della collezione. L'elemento successivo deve essere l'elemento con profondità immediatamente successiva all'attuale elemento.
 * @override
 * @return {void}
 */
GraphicObjectIterator.prototype.next = function() {
	this.index++;
};

/**
 * Sposta l'iteratore al precedente elemento della collezione. L'elemento precedente deve essere l'elemento con profondità immediatamente precedente all'attuale elemento.
 * @override
 * @return {void}
 */
GraphicObjectIterator.prototype.previous = function() {
	this.index--;
};

/**
 * Fornisce l'elemento associato alla posizione corrente.
 * @override
 * @return {GraphicObject} l'elemento associato alla posizione corrente.
 */
GraphicObjectIterator.prototype.getItem = function() {
	return this.graphicObjectCollection.getGraphicObject(this.index);
};
