/**
 * FILE: ShowAttackMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowAttackMenu.js
 * DATA CREAZIONE: 24 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ShowAttackMenu.prototype = new Action();

//Costruttore della classe.
ShowAttackMenu.prototype.constructor = ShowAttackMenu;

/**
 * Classe per la visualizzazione del menù per l'attacco.
 * @implements Action
 * @constructor
 * @param {Object} user L'utente di cui visualizzare il menù.
 */
function ShowAttackMenu(user) {
    /**
     * L'utente a cui visualizzare il menù.
     * @type {Object}
     * @private
     */
    this.user = user;
}

/**
 * Si occupa di mostrare all'utente il menù.
 * @override
 * @return {void}
 */
ShowAttackMenu.prototype.performAction = function() {
	var units = DataFactory.getInstance().getUnits();
	var quantity = [];
	for(var key in units)
		if(units[key].getAttack() > 0 && units[key].getDefence() > 0)
			quantity[key] = parseInt(prompt("Quante unità di tipo " + units[key].getName() + " vuoi mandare all'attacco?", "0"));

	var possibleAttack = true;
	var userData = UserDataManager.getInstance().getUserData();
	for(var unitKey in quantity) {
		var ownedUnit = userData.getUnitPossession(unitKey);
		if(quantity[unitKey] < 0 || quantity[unitKey] > ownedUnit.getQuantity())
			possibleAttack = false;
	}
	var menu;
	if(possibleAttack)
		menu = (new ConfirmMenuFactory(new RequestAttackUser(this.user, quantity), new CloseContextualMenu())).buildMenu();
	else
		menu = (new NotifyMenuFactory("La quantità inserita non è valida. Deve essere positiva oppure non possiedi abbastanza unità.", new EnableRightClick())).buildMenu();
	var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(menu); //aggiungo il frame
};