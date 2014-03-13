/**
 * FILE: ShowDemolishMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowDemolishMenu.js
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
ShowDemolishMenu.prototype = new Action();

//Costruttore della classe
ShowDemolishMenu.prototype.constructor = ShowDemolishMenu;

/**
 * Classe che visualizza il menù per la demolizione di un edificio.
 * @implements Action
 * @constructor
 * @param {BuildingComponent} buildingComponent L'edificio da demolire.
 */
function ShowDemolishMenu(buildingComponent) {
	/**
	 * L'edificio da demolire.
	 * @type {BuildingComponent}
     * @private
	 */
	this.buildingComponent = buildingComponent;
}

/**
 * Si occupa di mostrare all'utente il menù.
 * @override
 * @return {void}
 */
ShowDemolishMenu.prototype.performAction = function() {
	var confirmMenu = (new ConfirmMenuFactory(new RequestDemolishBuilding(this.buildingComponent), new CloseContextualMenu())).buildMenu();

	var widgets = confirmMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(confirmMenu); //aggiungo il frame
};