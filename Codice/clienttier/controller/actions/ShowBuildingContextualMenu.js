/**
 * FILE: ShowBuildingContextualMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowBuildingContextualMenu.js
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ShowBuildingContextualMenu.prototype = new Action();

//Costruttore della classe.
ShowBuildingContextualMenu.prototype.constructor = ShowBuildingContextualMenu;

/**
 * Classe per la creazione di un menu di tipo contestuale relativo ad una costruzione.
 * @implements Action
 * @constructor
 * @param {BuildingComponent} buildingComponent L'edificio di cui visualizzare il menu contestuale.
 */
function ShowBuildingContextualMenu(buildingComponent) {
	/**
	 * L'edificio di cui visualizzare il menu contestuale.
	 * @type {BuildingComponent}
     * @private
	 */
	this.buildingComponent = buildingComponent;
}

/**
 * Visualizza il menu contestuale relativo all'edificio indicato.
 * @override
 * @return {void}
 */
ShowBuildingContextualMenu.prototype.performAction = function () {
	var point = new Point2D(event.clientX, event.clientY);
	var contextualMenu = (new BuildingContextualMenuFactory(this.buildingComponent, point)).buildMenu(); //costruisco il menu contestuale

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