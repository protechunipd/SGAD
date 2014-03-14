/**
 * FILE: DragAndDrop.js
 * PERCORSO /Codice/sgad/clienttier/view/commands/DragAndDrop.js
 * DATA CREAZIONE: 16 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-16 - Creazione della classe - Battistella Stefano
 */

//Eredita da Command.
DragAndDrop.prototype = new Command();

//Costruttore della classe.
DragAndDrop.prototype.constructor = DragAndDrop;

/**
 * Classe per la gestione di un evento, di tipo drag and drop, nell'area di gioco.
 * @constructor
 */
function DragAndDrop() {
	/**
	 * La posizione x iniziale dalla quale si inizia a traslare.
	 * @type {int}
	 */
	this.startX = event.clientX;
	/**
	 * La posizione y iniziale dalla quale si inizia a traslare.
	 * @type {int}
	 */
	this.startY = event.clientY;
	/**
	 * Mantiene i limiti alla traslazione della telecamera.
	 * @type {Bound}
	 */
	this.bound = Bound.getInstance();
}
/**
 * Trasla la posizione del bound di un spostamento pari allo spostamento del mouse.
 * @param {Event} event L'evento contenente le coordinate nel quale si ? verificato.
 * @param {Iterator} iterator L'iteratore pu? essere imposto a null. Il metodo non necessita di iteratori.
 * @return {void}
 */
DragAndDrop.prototype.execute = function(event, iterator) {
	if (event.type === "drag" && event.clientX !== 0 && event.clientY !== 0)
		this.bound.shift(new Point2D(event.clientX - this.startX, event.clientY - this.startY));
    else if (event.type === "dragend" && event.clientX === 0 && event.clientY === 0)
		this.bound.shift(new Point2D(event.clientX - window.screenLeft-6, event.clientY - window.screenTop));

	if(event.type === "dragstart" || event.type === "drag" || event.type === "dragend") {
		this.startX = event.clientX;
		this.startY = event.clientY;
	}

	var touch = null;
	if(event.type === "touchstart" || event.type === "touchmove" || event.type === "touchend") {
		touch = event.touches[0];
	}

	if (event.type === "touchmove" && touch.pageX !== 0 && touch.pageY !== 0)
		this.bound.shift(new Point2D(touch.pageX - this.startX, touch.pageY - this.startY));
	else if (event.type === "touchend" && touch.pageX === 0 && touch.clientY === 0)
		this.bound.shift(new Point2D(touch.pageX - window.screenLeft - 6, touch.clientY - window.screenTop));


};
