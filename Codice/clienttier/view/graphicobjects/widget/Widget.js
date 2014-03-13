/**
 * FILE: Widget.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/widget/Widget.js
 * DATA CREAZIONE: 12 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-12 - Creazione della classe - Gallo Francesco
 */

//Eredita da GraphicObject
Widget.prototype = new GraphicObject();

//Costruttore della classe.
Widget.prototype.constructor = Widget;

/**
 *  Classe astratta per i possibili widget che possono essere rappresentati per interagire con il mondo di gioco.
 *  @constructor
 */
function Widget() {
	/**
	 * Larghezza dell'oggetto widget
	 * @type {int}
     * @private
	 */
	this.width = 0;
	/**
	 * Altezza dell'oggetto widget
	 * @type {int}
     * @private
	 */
	this.height = 0;
	/**
	 * Il poligono che rappresenta l'oggetto grafico.
	 * @type {Shape}
     * @private
	 */
	this.shape = new Shape();
	/**
	 * L'azione da eseguire al verificarsi dell'evento rightclick.
	 * @type {Action}
     * @private
	 */
	this.onClickAction;
	/**
	 * L'azione da eseguire al verificarsi dell'evento click.
	 * @type {Action}
     * @private
	 */
	this.onRightClickAction;
	/**
	 * Indica se si può interagire con l'oggetto o meno.
	 * @type {bool}
     * @private
	 */
	this.enabled = true;
}
/**
 * Fornisce la forma che rappresenta l'oggetto grafico.
 * @override
 * @return {Shape} La forma che rappresenta l'oggetto grafico.
 */
Widget.prototype.getShape = function() {
	return this.shape;
};
/**
 * Imposta se si possa interagire con l'oggetto o meno.
 * @param {bool} _enabled Indica se si può interagire con l'oggetto, valore pari a true, o meno, valore pari a false.
 * @return {void}
 */
Widget.prototype.setEnabled = function(_enabled) {
	this.enabled = _enabled;
};
/**
 * Ritorna se si può interagire con l'oggetto o meno.
 * @return {bool} Indica se si può interagire con l'oggetto, valore pari a true, o meno, valore pari a false.
 */
Widget.prototype.getEnabled = function() {
	return this.enabled;
};
/**
 * Imposta l'azione da eseguire al verificarsi dell'evento click.
 * @param {Action} action L'azione da impostare.
 * @return {void}
 */
Widget.prototype.setOnClickEvent = function(action) {
	this.onClickAction = action;
};
/**
 * Imposta l'azione da eseguire al verificarsi dell'evento rightclick.
 * @param {Action} action L'azione da impostare.
 * @return {void}
 */
Widget.prototype.setOnRightClickEvent = function(action) {
	this.onRightClickAction = action;
};
/**
 * Imposta l'azione da eseguire al verificarsi dell'evento click.
 * @return {Action} L'azione da eseguire al verificarsi dell'evento click.
 */
Widget.prototype.getOnClickEvent = function() {
	return this.onClickAction;
};
/**
 * Imposta l'azione da eseguire al verificarsi dell'evento rightclick.
 * @return {Action} L'azione da eseguire al verificarsi dell'evento rightclick.
 */
Widget.prototype.getOnRightClickEvent = function() {
	return this.onRightClickAction;
};
/**
 * Esegue l'azione impostata nell'attributo onClickAction.
 * @override
 * @return {void}
 */
Widget.prototype.onClick = function() {
};
/**
 * Esegue l'azione impostata nell'attributo onRightClickAction.
 * @override
 * @return {void}
 */
Widget.prototype.onRightClick = function() {
};
/**
 * Ritorna l'altezza del widget.
 * @return {int} L'altezza del widget.
 */
Widget.prototype.getHeight = function() {
	return this.height;
};
/**
 * Ritorna la larghezza del widget.
 * @return {int} La larghezza del widget.
 */
Widget.prototype.getWidth = function() {
	return this.width;
};
