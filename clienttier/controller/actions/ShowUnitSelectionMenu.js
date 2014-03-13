/**
 * FILE: ShowUnitSelectionMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowUnitSelectionMenu.js
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ShowUnitSelectionMenu.prototype = new Action();

//Costruttore della classe.
ShowUnitSelectionMenu.prototype.constructor = ShowUnitSelectionMenu;

/**
 * Classe per la visualizzazione di un menù per le unità addestrabili.
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio di cui richiedere l'addestramento delle unità.
 */
function ShowUnitSelectionMenu(buildingPossession) {
    /**
     * L'edificio di cui richiedere l'addestramento delle unità.
     * @type {BuildingPossession}
     * @private
     */
    this.buildingPossession = buildingPossession;
}

/**
 * Visualizza il menu delle unità addestrabili.
 * @override
 * @return {void}
 */
ShowUnitSelectionMenu.prototype.performAction = function() {
	var unitSelectionMenu = (new UnitSelectionMenu(this.buildingPossession)).buildMenu();

	var widgets = unitSelectionMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(unitSelectionMenu); //aggiungo il frame
};