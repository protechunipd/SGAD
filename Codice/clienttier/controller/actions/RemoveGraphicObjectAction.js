/**
 * FILE: RemoveGraphicObjectAction.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RemoveGraphicObjectAction.js
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
RemoveGraphicObjectAction.prototype = new Action();

//Costruttore della classe.
RemoveGraphicObjectAction.prototype.constructor = RemoveGraphicObjectAction;

/**
 * Classe per la rimozione di un oggetto grafico visualizzato nell'area di gioco.
 * @implements Action
 * @constructor
 * @param {GraphicObject} graphicObject Oggetto grafico da rimuovere.
 */
function RemoveGraphicObjectAction(graphicObject) {
	/**
	 * L'oggetto grafico da rimuovere.
	 * @type {GraphicObject}
     * @private
	 */
	this.graphicObjectToDelete = graphicObject;
}

/**
 * Rimuove l'oggetto grafico indicato.
 * @override
 * @return {void}
 */
RemoveGraphicObjectAction.prototype.performAction = function () {
	var context = Context.getInstance();
	context.removeGraphicObject(this.graphicObjectToDelete);
};