/**
 * FILE: ShowUpgradeMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowUpgradeMenu.js
 * DATA CREAZIONE: 22 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-22 - Creazione della classe - Gallo Francesco
 */

//Eredita da Action
ShowUpgradeMenu.prototype = new Action();

//Costruttore della classe.
ShowUpgradeMenu.prototype.constructor = ShowUpgradeMenu;

/**
 * Classe che visualizza il menù per la conferma di miglioramento.
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio di cui richiedere la conferma di miglioramento.
 */
function ShowUpgradeMenu(buildingPossession) {
	/**
	 * L'edificio di cui richiedere la conferma di miglioramento.
	 * @type {BuildingPossession}
     * @private
	 */
	this.buildingPossession = buildingPossession;
}

/**
 * Visualizza il menu per richiedere la conferma del miglioramento.
 * @override
 * @return {void}
 */
ShowUpgradeMenu.prototype.performAction = function() {
	var confirmMenu = (new ConfirmMenuFactory(new RequestUpgradeBuilding(this.buildingPossession), new CloseContextualMenu())).buildMenu();

	var widgets = confirmMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(confirmMenu); //aggiungo il frame
};