/**
 * FILE: ShowDismissUnitMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowDismissUnitMenu.js
 * DATA CREAZIONE: 22 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Battistella Stefano
 * 2014-02-23 - Implementato metodo performAction() - Battistella Stefano
 */

//Eredita da Action
ShowDismissUnitMenu.prototype = new Action();

//Costruttore della classe.
ShowDismissUnitMenu.prototype.constructor = ShowDismissUnitMenu;

/**
 * Classe per la gestione della visualizzazione di un menu che permette all'utente di dimettere le unità.
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio da cui richiedere la dimissione delle unità.
 * @param {Unit} unit Il tipo di unità da dimettere.
 */
function ShowDismissUnitMenu(buildingPossession, unit) {
	/**
	 * L'edificio da cui richiedere la dimissione delle unità.
	 * @type {BuildingPossession}
     * @private
	 */
	this.buildingPossession = buildingPossession;
	/**
	 * Il tipo di unità da dimettere.
	 * @type {Unit}
     * @private
	 */
	this.unit = unit;
}

/**
 * Visualizza il menu per richiedere la quantità da inserire e la conferma della dimissione.
 * @override
 * @return {void}
 */
ShowDismissUnitMenu.prototype.performAction = function() {
	var quantity = parseInt(prompt("Inserisci la quatità da congedare", "0"));

	var userData = UserDataManager.getInstance().getUserData();
	var ownedUnit = userData.getOwnedUnits()[this.unit.getKey()];

	var menu;

	if(quantity > ownedUnit.getQuantity())
		menu = (new NotifyMenuFactory("La quantità inserita non è valida. Non hai sufficienti unità.", new EnableRightClick())).buildMenu();
	else if(quantity < 0)
		menu = (new NotifyMenuFactory("La quantità inserita non è valida. Deve essere positiva.", new EnableRightClick())).buildMenu();
	else
		menu = (new ConfirmMenuFactory(new RequestDismissUnits(this.unit, quantity), new CloseContextualMenu())).buildMenu();

	var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var j = 0; j < widgets.length; j++) {
		context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(menu); //aggiungo il frame
};