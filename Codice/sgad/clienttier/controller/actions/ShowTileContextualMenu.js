/**
 * FILE: ShowTileContextualMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowTileContextualMenu.js
 * DATA CREAZIONE: 22 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-22 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ShowTileContextualMenu.prototype = new Action();

//Costruttore della classe.
ShowTileContextualMenu.prototype.constructor = ShowTileContextualMenu;

/**
 * Classe per la creazione di un menu di tipo contestuale relativo ad una casella.
 * @implements Action
 * @constructor
 * @param {TileComponent} tileComponent La casella di cui visualizzare il menu contestuale.
 */
function ShowTileContextualMenu(tileComponent) {
	/**
	 * La casella di cui visualizzare il menu contestuale.
	 * @type {TileComponent}
     * @private
	 */
	this.tileComponent = tileComponent;
}

/**
 * Visualizza il menu contestuale relativo alla casella indicata.
 * @override
 * @return {void}
 */
ShowTileContextualMenu.prototype.performAction = function () {
	var point = new Point2D(event.clientX, event.clientY);
	var contextualMenu = (new TileContextualMenuFactory(this.tileComponent, point)).buildMenu(); //costruisco il menu contestuale

	var closeContextualMenu = new CloseContextualMenu(); //chiudo il menu contestuale già visualizzato
	closeContextualMenu.performAction();

	var widgets = contextualMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.setContextualMenu(contextualMenu);
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(contextualMenu); //aggiungo il frame
};